/**
 * Sweeps every breakpoint the design claims to support, checking for
 * horizontal overflow, elements bleeding past the gutter, console errors and
 * broken images — and saving one hero + one mid-page frame at each width.
 *
 *   node tools/responsive.mjs <outDir> [baseUrl]
 */
import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";

const out = process.argv[2];
const base = process.argv[3] ?? "http://localhost:4123";
await mkdir(out, { recursive: true });

const WIDTHS = [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920];
const browser = await chromium.launch();
const problems = [];

for (const width of WIDTHS) {
  const ctx = await browser.newContext({
    viewport: { width, height: width < 700 ? 800 : 900 },
    isMobile: width < 700,
    hasTouch: width < 700,
  });
  const page = await ctx.newPage();
  page.on("console", (m) => {
    if (m.type() === "error") problems.push(`[${width}] console: ${m.text()}`);
  });
  page.on("pageerror", (e) => problems.push(`[${width}] pageerror: ${e.message}`));

  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(2400);
  await page.screenshot({ path: `${out}/w${width}-hero.png` });

  // walk the whole page so every lazy image and reveal fires
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 130));
    }
  });
  await page.waitForTimeout(1200);

  const report = await page.evaluate(() => {
    const doc = document.documentElement;
    const overflow = doc.scrollWidth - doc.clientWidth;

    const bleeding = [];
    for (const el of document.querySelectorAll("body *")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (r.right > doc.clientWidth + 1.5 || r.left < -1.5) {
        const cs = getComputedStyle(el);
        // fixed chrome, decoration, and anything an ancestor already clips
        // are all allowed to exceed the viewport box
        if (cs.position === "fixed" || el.getAttribute("aria-hidden") === "true") continue;
        if (el.closest("[aria-hidden='true']")) continue;
        let clipped = false;
        for (let a = el.parentElement; a; a = a.parentElement) {
          const acs = getComputedStyle(a);
          if (/hidden|clip|auto|scroll/.test(acs.overflowX)) { clipped = true; break; }
        }
        if (clipped) continue;
        bleeding.push(`${el.tagName}.${(el.className + "").slice(0, 40)} @ ${Math.round(r.left)}..${Math.round(r.right)}`);
      }
    }

    const brokenImages = [...document.images]
      .filter((i) => i.complete && i.naturalWidth === 0)
      .map((i) => i.currentSrc || i.src);

    const tiny = [...document.querySelectorAll("button, a")]
      .filter((el) => {
        if (el.closest(".sr-only") || el.classList.contains("sr-only")) return false;
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && (r.height < 22 || r.width < 22);
      })
      .map((el) => `${el.tagName}:${(el.textContent || "").trim().slice(0, 24)}`);

    return { overflow, bleeding: bleeding.slice(0, 6), brokenImages, tiny: [...new Set(tiny)].slice(0, 6) };
  });

  if (report.overflow > 1) problems.push(`[${width}] horizontal overflow ${report.overflow}px`);
  for (const b of report.bleeding) problems.push(`[${width}] bleeds past viewport: ${b}`);
  for (const b of report.brokenImages) problems.push(`[${width}] broken image: ${b}`);
  for (const t of report.tiny) problems.push(`[${width}] small hit target: ${t}`);

  await page.evaluate(() => {
    document.querySelector("#process")?.scrollIntoView({ block: "start", behavior: "instant" });
  });
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${out}/w${width}-process.png` });

  await page.evaluate(() => {
    document.querySelector("#contact")?.scrollIntoView({ block: "start", behavior: "instant" });
  });
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${out}/w${width}-contact.png` });

  await ctx.close();
}

await browser.close();

if (problems.length) {
  console.log("PROBLEMS:");
  for (const p of [...new Set(problems)]) console.log(" -", p);
} else {
  console.log(`clean across ${WIDTHS.join(", ")}`);
}
