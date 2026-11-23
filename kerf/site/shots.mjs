// Screenshots at 390 and 1440 of the built page, served by serve.mjs. Writes to shots/ (gitignored).
import { chromium } from "playwright";
import { mkdirSync } from "fs";
const base = process.env.BASE || "http://127.0.0.1:8811";
mkdirSync("shots", { recursive: true });
const b = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
for (const pg of (process.env.PAGES || "index").split(","))
for (const [w, h, name0] of [[390, 844, "390"], [1440, 900, "1440"]]) {
  const name = `${pg}-${name0}`;
  const p = await b.newPage({ viewport: { width: w, height: h } });
  const errs = [];
  p.on("pageerror", (e) => errs.push(String(e)));
  p.on("console", (m) => { if (m.type() === "error" && !/fonts\.g|ERR_|Failed to load/.test(m.text())) errs.push(m.text()); });
  await p.goto(`${base}/${pg}.html`, { waitUntil: "load" });
  await p.evaluate(() => document.querySelectorAll("[data-reveal]").forEach((e) => e.classList.add("in")));
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `shots/${name}-top.png` });
  await p.screenshot({ path: `shots/${name}-full.png`, fullPage: true });
  const sw = await p.evaluate(() => document.documentElement.scrollWidth);
  console.log(name, "scrollWidth", sw, sw > w ? "SIDEWAYS SCROLL" : "ok", "errors", errs);
  await p.close();
}
await b.close();
