/**
 * Screenshots the running site at a set of viewports and scroll positions,
 * and reports any console errors or page errors it sees along the way.
 *
 *   node tools/shoot.mjs <outDir> [baseUrl]
 */
import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";

const out = process.argv[2];
const base = process.argv[3] ?? "http://localhost:4123";
await mkdir(out, { recursive: true });

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const SHOTS = [
  { name: "01-hero", y: 0 },
  { name: "02-positioning", sel: "#discover" },
  { name: "03-services", sel: "#services" },
  { name: "04-process", sel: "#process" },
  { name: "05-faq", sel: "#faq" },
  { name: "06-reviews", sel: "#reviews" },
  { name: "07-field", sel: "#field" },
  { name: "08-contact", sel: "#contact" },
  { name: "09-closing", y: "bottom" },
];

const browser = await chromium.launch();
const problems = [];

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    reducedMotion: "no-preference",
  });
  const page = await ctx.newPage();

  page.on("console", (m) => {
    if (m.type() === "error") problems.push(`[${vp.name}] console: ${m.text()}`);
  });
  page.on("pageerror", (e) => problems.push(`[${vp.name}] pageerror: ${e.message}`));
  page.on("requestfailed", (r) =>
    problems.push(`[${vp.name}] requestfailed: ${r.url()} — ${r.failure()?.errorText}`),
  );

  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(2600); // let the hero load sequence finish

  for (const shot of SHOTS) {
    if (shot.sel) {
      await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "instant" });
      }, shot.sel);
    } else if (shot.y === "bottom") {
      await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
    } else {
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), shot.y);
    }
    await page.waitForTimeout(1400);
    await page.screenshot({ path: `${out}/${vp.name}-${shot.name}.png` });
  }

  // horizontal overflow check
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  if (overflow > 1) problems.push(`[${vp.name}] horizontal overflow: ${overflow}px`);

  await ctx.close();
}

await browser.close();

if (problems.length) {
  console.log("PROBLEMS:");
  for (const p of [...new Set(problems)]) console.log(" -", p);
} else {
  console.log("no console errors, no failed requests, no horizontal overflow");
}
