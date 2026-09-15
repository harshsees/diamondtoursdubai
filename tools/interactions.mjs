/**
 * Drives the interactive parts of the site and screenshots each state, so the
 * hero slider, about carousel, mobile menu, forms and back-to-top control can
 * be reviewed without clicking through by hand.
 *
 *   node tools/interactions.mjs <outDir> [baseUrl]
 */
import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";

const out = process.argv[2];
const base = process.argv[3] ?? "http://localhost:4123";
await mkdir(out, { recursive: true });

const browser = await chromium.launch();
const problems = [];

function watch(page, tag) {
  page.on("console", (m) => {
    if (m.type() === "error") problems.push(`[${tag}] console: ${m.text()}`);
  });
  page.on("pageerror", (e) => problems.push(`[${tag}] pageerror: ${e.message}`));
}

/* ------------------------------------------------------------- desktop ---- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  watch(page, "desktop");
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  // Hero slider: step forward twice via the arrows.
  await page.hover(".hero");
  for (const i of [1, 2]) {
    await page.click(".hero-nav--next");
    await page.waitForTimeout(1100);
    await page.screenshot({ path: `${out}/hero-slide-${i}.png`, clip: { x: 0, y: 150, width: 1440, height: 700 } });
  }

  // Navigation hover.
  await page.hover(".main-nav li:nth-child(3) a");
  await page.waitForTimeout(250);
  await page.screenshot({ path: `${out}/nav-hover.png`, clip: { x: 0, y: 0, width: 1440, height: 170 } });

  // About carousel: jump to the last frame.
  const about = await page.$(".who-we-are");
  await about.scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  await page.click(".carousel-dots button:last-child");
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${out}/carousel-last.png` });

  // Pill hover.
  await page.$eval(".pill-section", (el) => el.scrollIntoView());
  await page.waitForTimeout(600);
  await page.hover(".pill-item:nth-child(3) .pill");
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${out}/pill-hover.png` });

  // Callback form: submit it and capture the response.
  await page.fill("#cb-name", "Test Person");
  await page.fill("#cb-company", "Test Co");
  await page.fill("#cb-phone", "+1 555 0100");
  await page.fill("#cb-email", "test@example.com");
  await page.click(".callback-form button[type=submit]");
  await page.waitForTimeout(1600);
  await page.screenshot({ path: `${out}/callback-submitted.png` });

  // Back-to-top.
  await page.click(".to-top");
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${out}/back-to-top.png`, clip: { x: 0, y: 0, width: 1440, height: 400 } });

  await ctx.close();
}

/* -------------------------------------------------------------- mobile ---- */
{
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await ctx.newPage();
  watch(page, "mobile");
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  await page.tap(".nav-toggle");
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${out}/mobile-menu-open.png` });

  await page.tap(".main-nav li:nth-child(2) a");
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `${out}/mobile-after-nav.png` });

  await ctx.close();
}

await browser.close();

if (problems.length) {
  console.error("Problems:\n  " + problems.join("\n  "));
  process.exitCode = 1;
} else {
  console.log(`Clean. Interaction states in ${out}`);
}
