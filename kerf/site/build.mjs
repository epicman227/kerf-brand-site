import { build } from "esbuild";
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync, rmSync } from "fs";

const imgDir = "../images";
const names = ["hero","hero-bg","storm-roof","rigging","grinder","cleanup","log-rounds","spar","founder","hvac","plumber","landscaping","roofing","homeowner-text"];
const have = {};
rmSync("dist/images", { recursive: true, force: true });
mkdirSync("dist/images/logos", { recursive: true });
for (const n of names) {
  const p = `${imgDir}/${n}.webp`;
  if (existsSync(p)) { have[n] = true; copyFileSync(p, `dist/images/${n}.webp`); }
}
const logos = {};
const logoDir = `${imgDir}/logos`;
if (existsSync(logoDir)) for (const f of readdirSync(logoDir)) {
  const m = f.match(/^([a-z0-9-]+)\.(svg|png)$/); if (!m) continue;
  logos[m[1]] = f; copyFileSync(`${logoDir}/${f}`, `dist/images/logos/${f}`);
}
const css = readFileSync("src/styles.css", "utf8");
const icon = encodeURIComponent(readFileSync("../brand/kerf-mark.svg", "utf8"));
const meta = {
  index: ["Kerf. The AI front office for tree care companies.", "Kerf answers your phone 24/7, texts back every missed call in under a minute, books the estimate, and follows up until the removal is won. Built by a certified arborist."],
  trades: ["Kerf. The AI front office for home service trades.", "Kerf answers your phone 24/7, texts back every missed call in under a minute, books the job, and follows up until the quote is won. HVAC, plumbing, roofing, landscaping, electrical."],
};
for (const page of ["index", "trades"]) {
  const r = await build({
    entryPoints: ["src/main.jsx"], bundle: true, minify: true, write: false, format: "iife", jsx: "automatic", target: ["es2019"],
    define: { "process.env.NODE_ENV": '"production"', "__KERF_IMAGES__": JSON.stringify(have), "__KERF_LOGOS__": JSON.stringify(logos), "__KERF_PAGE__": JSON.stringify(page) },
    legalComments: "none",
  });
  const js = r.outputFiles[0].text;
  const [title, desc] = meta[page];
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
<link rel="icon" href="data:image/svg+xml,${icon}">
<style>${css}</style>
</head>
<body>
<div id="root"></div>
<script>${js.replace(/<\/script/gi, "<\\/script")}</script>
</body>
</html>`;
  writeFileSync(`dist/${page}.html`, html);
  console.log(page, "built; size KB:", Math.round(html.length / 1024));
}
console.log("images:", Object.keys(have).join(",") || "none", "| logos:", Object.keys(logos).join(",") || "none");
