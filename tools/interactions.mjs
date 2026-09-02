/**
 * Drives the interactive parts of the page and screenshots each state, so
 * the drawer, accordion, carousels, mobile menu and form can be reviewed
 * without clicking through by hand.
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
  await page.waitForTimeout(2000);

  // service drawer
  await page.getByRole("button", { name: /freight & logistics/i }).click();
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${out}/drawer-open.png` });
  const dialog = await page.getByRole("dialog").count();
  if (dialog !== 1) problems.push(`expected 1 dialog, found ${dialog}`);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(800);

  // process carousel — step forward twice
  await page.locator("#process").scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  await page.getByRole("button", { name: /^Next step/ }).click();
  await page.waitForTimeout(700);
  await page.getByRole("button", { name: /^Next step/ }).click();
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${out}/process-step-3.png` });

  // faq
  await page.locator("#faq").scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  const q = page.getByRole("button", { name: /easiest way to import a vehicle/i });
  await q.click();
  await page.waitForTimeout(800);
  if ((await q.getAttribute("aria-expanded")) !== "true") problems.push("faq aria-expanded not true after click");
  await page.screenshot({ path: `${out}/faq-open.png` });

  // reviews carousel
  await page.locator("#reviews").scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  await page.getByRole("button", { name: /Next review/ }).click();
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${out}/reviews-next.png` });

  // form validation
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  await page.getByRole("button", { name: /send message/i }).click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${out}/form-errors.png` });

  // successful submit
  await page.fill('input[name="firstName"]', "Jane");
  await page.fill('input[name="lastName"]', "Smith");
  await page.fill('input[name="email"]', "jane@example.com");
  await page.fill('textarea[name="message"]', "Two excavators, Rotterdam to Toronto, ideally next month.");
  await page.getByRole("button", { name: /send message/i }).click();
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `${out}/form-success.png` });
  const ok = await page.getByText(/that's with us/i).count();
  if (ok !== 1) problems.push("success state did not render");

  await ctx.close();
}

/* -------------------------------------------------------------- mobile ---- */
{
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await ctx.newPage();
  watch(page, "mobile");
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  await page.getByRole("button", { name: /open menu/i }).click();
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${out}/mobile-menu.png` });

  const locked = await page.evaluate(() => getComputedStyle(document.body).overflow);
  if (locked !== "hidden") problems.push(`body not scroll-locked with menu open (overflow: ${locked})`);

  await page.getByRole("button", { name: /close menu/i }).click();
  await page.waitForTimeout(700);

  await page.locator("#services").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.getByRole("button", { name: /customs & compliance/i }).click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${out}/mobile-drawer.png` });

  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
  await page.waitForTimeout(1000);
  await ctx.close();
}

/* --------------------------------------------------------- reduced motion */
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  watch(page, "reduced");
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${out}/reduced-hero.png` });
  await page.locator("#services").scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${out}/reduced-services.png` });
  await ctx.close();
}

/* ------------------------------------------------------------- routes ---- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  watch(page, "routes");
  for (const path of ["/privacy", "/terms", "/this-route-does-not-exist"]) {
    const res = await page.goto(base + path, { waitUntil: "networkidle" });
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${out}/route${path.replace(/\//g, "-")}.png` });
    const expected = path.startsWith("/this") ? 404 : 200;
    if (res?.status() !== expected) problems.push(`${path} returned ${res?.status()}, expected ${expected}`);
  }
  await ctx.close();
}

await browser.close();

if (problems.length) {
  console.log("PROBLEMS:");
  for (const p of [...new Set(problems)]) console.log(" -", p);
} else {
  console.log("all interactions behaved");
}
