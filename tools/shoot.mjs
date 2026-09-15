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
  { name: "02-intro", sel: "#home-intro" },
  { name: "03-difference", sel: ".featured-boxes" },
  { name: "04-who-we-are", sel: ".who-we-are" },
  { name: "05-lists", sel: ".pill-section" },
  { name: "06-callback", sel: ".callback-form" },
  { name: "07-footer", y: "bottom" },
];

const PAGES = ["", "about", "services", "compliance", "cargo", "contact"];

const browser = await chromium.launch();
const problems = [];

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    isMobile: vp.width < 700,
    hasTouch: vp.width < 700,
  });
  const page = await ctx.newPage();

  page.on("console", (m) => {
    if (m.type() === "error") problems.push(`[${vp.name}] console: ${m.text()}`);
  });
  page.on("pageerror", (e) => problems.push(`[${vp.name}] pageerror: ${e.message}`));
  page.on("requestfailed", (r) =>
    problems.push(`[${vp.name}] requestfailed: ${r.url()} — ${r.failure()?.errorText}`),
  );

  await page.goto(base, { waitUntil: "load" });
  await page.waitForTimeout(1200);

  for (const shot of SHOTS) {
    if (shot.sel) {
      await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: "instant" });
      }, shot.sel);
    } else if (shot.y === "bottom") {
      await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
    } else {
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), shot.y);
    }
    await page.waitForTimeout(900); // let the reveal transitions settle
    await page.screenshot({ path: `${out}/${vp.name}-${shot.name}.png` });
  }

  for (const slug of PAGES.slice(1)) {
    await page.goto(`${base}/${slug}`, { waitUntil: "load" });
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${out}/${vp.name}-page-${slug}.png`, fullPage: true });
  }

  await ctx.close();
}

await browser.close();

if (problems.length) {
  console.error("Problems:\n  " + problems.join("\n  "));
  process.exitCode = 1;
} else {
  console.log(`Clean. Screenshots in ${out}`);
}
