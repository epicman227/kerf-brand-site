import { chromium } from "playwright";
const b = await chromium.launch();
for (const [w,h,name] of [[390,844,"m"],[1440,900,"d"]]) {
  const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const errs = [];
  p.on("pageerror", e => errs.push(String(e)));
  p.on("console", m => { if (m.type()==="error") errs.push(m.text()); });
  await p.goto("file:///home/claude/kerf/site/dist/index.html", { waitUntil: "networkidle" });
  await p.waitForTimeout(1200);
  await p.screenshot({ path: `shots/${name}-top.png` });
  await p.screenshot({ path: `shots/${name}-full.png`, fullPage: true });
  const sw = await p.evaluate(() => document.documentElement.scrollWidth);
  console.log(name, "scrollWidth", sw, "errors", errs);
  await p.close();
}
await b.close();
