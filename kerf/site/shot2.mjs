import { chromium } from "playwright";
import { resolve } from "path";
const b = await chromium.launch();
for (const page of ["index","trades"]) {
  for (const [name, w, h] of [["m",390,844],["d",1440,900]]) {
    const ctx = await b.newContext({ viewport:{width:w,height:h}, deviceScaleFactor:1 });
    const p = await ctx.newPage();
    const errs=[]; p.on("console", m => { if (m.type()==="error") errs.push(m.text()); }); p.on("pageerror", e=>errs.push(String(e)));
    await p.goto("file://"+resolve(`dist/${page}.html`)); await p.waitForTimeout(1500);
    await p.screenshot({ path:`shots2/${page}-${name}-top.png` });
    // scroll through to trigger reveals
    const H = await p.evaluate(()=>document.body.scrollHeight);
    for (let y=0;y<H;y+=h*0.7){ await p.evaluate(v=>window.scrollTo(0,v),y); await p.waitForTimeout(120); }
    const how = await p.evaluate(()=>document.querySelector("#how").offsetTop);
    await p.evaluate(v=>window.scrollTo(0,v), how+ (w>900? 500: 260)); await p.waitForTimeout(700);
    await p.screenshot({ path:`shots2/${page}-${name}-how.png` });
    await p.evaluate(()=>window.scrollTo(0,0)); await p.waitForTimeout(400);
    await p.screenshot({ path:`shots2/${page}-${name}-full.png`, fullPage:true });
    const ow = await p.evaluate(()=>document.documentElement.scrollWidth);
    console.log(page,name,"scrollWidth",ow,"errors",errs.length, errs.slice(0,3));
    await ctx.close();
  }
}
await b.close();
