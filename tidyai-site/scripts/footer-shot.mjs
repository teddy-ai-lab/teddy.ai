// Screenshot the footer social row and the favicon rendered large.
import { chromium } from "playwright-core";

const url = process.argv[2] ?? "http://localhost:5174/";
const dir = process.argv[3] ?? ".";

const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const problems = [];
page.on("pageerror", (e) => problems.push(`pageerror: ${e.message}`));
page.on("console", (m) => {
  if (m.type() === "error") problems.push(`console.error: ${m.text()}`);
});

await page.goto(url, { waitUntil: "networkidle" });
await page.keyboard.press("End");
await page.waitForTimeout(1500);
await page.locator("footer").screenshot({ path: `${dir}/footer.png` });

await page.goto(`${url}favicon.svg`);
await page.setViewportSize({ width: 256, height: 256 });
await page.evaluate(() => {
  const svg = document.querySelector("svg");
  if (svg) {
    svg.setAttribute("width", "256");
    svg.setAttribute("height", "256");
  }
});
await page.screenshot({ path: `${dir}/favicon-large.png` });

console.log(problems.length ? "PROBLEMS:\n" + problems.join("\n") : "NO console/page errors");
await browser.close();
