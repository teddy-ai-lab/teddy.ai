// Scrolls through the page like a user, screenshotting each section,
// plus a mobile pass with the menu open.
import { chromium } from "playwright-core";

const url = process.argv[2] ?? "http://localhost:5174/";
const dir = process.argv[3] ?? ".";

const browser = await chromium.launch({ channel: "msedge", headless: true });

const problems = [];
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("console", (m) => {
  if (m.type() === "error") problems.push(`console.error: ${m.text()}`);
});
page.on("pageerror", (e) => problems.push(`pageerror: ${e.message}`));

await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
await page.screenshot({ path: `${dir}/1-top.png` });

for (const [i, sel] of ["#projects", "#principles", "#benchmarks"].entries()) {
  await page.locator(sel).scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200); // let scroll-reveals play
  await page.screenshot({ path: `${dir}/${i + 2}-${sel.slice(1)}.png` });
}
await page.keyboard.press("End");
await page.waitForTimeout(800);
await page.screenshot({ path: `${dir}/5-footer.png` });

// Mobile pass
const mob = await browser.newPage({ viewport: { width: 360, height: 780 } });
mob.on("pageerror", (e) => problems.push(`mobile pageerror: ${e.message}`));
await mob.goto(url, { waitUntil: "networkidle" });
await mob.waitForTimeout(1500);
await mob.locator('button[aria-controls="mobile-menu"]').click();
await mob.waitForTimeout(500);
await mob.screenshot({ path: `${dir}/6-mobile-menu.png` });
await mob.locator('#mobile-menu a[href="#projects"]').click();
await mob.waitForTimeout(1200);
await mob.screenshot({ path: `${dir}/7-mobile-projects.png` });

console.log(problems.length ? "PROBLEMS:\n" + problems.join("\n") : "NO console/page errors");
await browser.close();
