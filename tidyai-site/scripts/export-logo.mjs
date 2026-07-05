// Renders the teddy logo to PNG (transparent background):
//   public/logo-mark.png — the bear mark alone, 512×512
//   public/logo.png      — full "teddy.ai" lockup, 2x scale
import { chromium } from "playwright-core";

const TEDDY_SVG = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="7.5" cy="7" r="4.8" fill="#6B4F3A"/>
  <circle cx="7.5" cy="7" r="2.3" fill="#A9825F"/>
  <circle cx="24.5" cy="7" r="4.8" fill="#6B4F3A"/>
  <circle cx="24.5" cy="7" r="2.3" fill="#A9825F"/>
  <circle cx="16" cy="18" r="11" fill="#6B4F3A"/>
  <ellipse cx="16" cy="22" rx="5.6" ry="4.4" fill="#A9825F"/>
  <circle cx="11.8" cy="14.5" r="1.5" fill="#2B211A"/>
  <circle cx="20.2" cy="14.5" r="1.5" fill="#2B211A"/>
  <path d="M14.4 20.2 h3.2 L16 22.1 Z" fill="#2B211A"/>
  <path d="M16 22.1 v1.5 M13.9 25.2 q2.1 1.4 4.2 0" stroke="#2B211A" stroke-width="1.1" stroke-linecap="round"/>
</svg>`;

const html = `<!doctype html><html><head>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">
<style>
  body { margin: 0; background: transparent; }
  #mark { width: 512px; height: 512px; display: inline-flex; }
  #lockup {
    display: inline-flex; align-items: center; gap: 20px; padding: 24px;
    font-family: "IBM Plex Mono", monospace; font-weight: 500;
    font-size: 96px; letter-spacing: -0.02em;
  }
</style></head><body>
<div id="mark">${TEDDY_SVG(512)}</div>
<div id="lockup">${TEDDY_SVG(120)}<span><span style="color:#A9825F">teddy</span><span style="color:#6B4F3A">.ai</span></span></div>
</body></html>`;

const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({ viewport: { width: 1400, height: 800 } });
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);

await page.locator("#mark").screenshot({ path: "public/logo-mark.png", omitBackground: true });
await page.locator("#lockup").screenshot({ path: "public/logo.png", omitBackground: true });

console.log("written: public/logo-mark.png, public/logo.png");
await browser.close();
