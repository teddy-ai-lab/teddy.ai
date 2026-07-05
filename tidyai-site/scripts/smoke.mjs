// Dev-only smoke test: renders the page in headless Edge, captures
// console errors/warnings and page errors, exercises nav + copy button,
// and screenshots the result.
import { chromium } from "playwright-core";

const url = process.argv[2] ?? "http://localhost:5174/";
const shot = process.argv[3] ?? "smoke.png";

const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const problems = [];
page.on("console", (msg) => {
  if (msg.type() === "error" || msg.type() === "warning") {
    problems.push(`console.${msg.type()}: ${msg.text()}`);
  }
});
page.on("pageerror", (err) => problems.push(`pageerror: ${err.message}`));
page.on("requestfailed", (req) => {
  problems.push(`requestfailed: ${req.url()} — ${req.failure()?.errorText}`);
});

await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(2500); // let hero animations + terminal typing run

const h1 = await page.locator("h1").innerText();
const sections = await page.locator("section[id], footer").count();
const cards = await page.locator("article").count();

// Drive it: open a nav link, click a copy button
await page.locator('nav a[href="#projects"]').first().click();
await page.waitForTimeout(600);
await page.locator('button[aria-label^="Copy command"]').first().click();
await page.waitForTimeout(300);
const copied = await page.evaluate(() => navigator.clipboard.readText().catch(() => "(blocked)"));

await page.waitForTimeout(1500);
await page.screenshot({ path: shot, fullPage: true });

console.log("h1:", h1.replace(/\n/g, " "));
console.log("sections+footer:", sections, "| project cards:", cards);
console.log("clipboard after copy click:", copied);
console.log(problems.length ? `PROBLEMS (${problems.length}):\n` + problems.join("\n") : "NO console/page errors");

await browser.close();
