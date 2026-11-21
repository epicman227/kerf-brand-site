import { build } from "esbuild";
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync, rmSync } from "fs";

const OUT = process.env.KERF_PRICING_DRAFT === "1" ? "dist-draft" : "dist";
const imgDir = "../images";
const names = []; // no photos: nothing on the page is an unlabeled generated image
const have = {};
rmSync("dist/trades.html", { force: true });
rmSync(`${OUT}/images`, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
for (const n of names) {
  const p = `${imgDir}/${n}.webp`;
  if (existsSync(p)) { have[n] = true; copyFileSync(p, `${OUT}/images/${n}.webp`); }
}
const logos = {}; // no partner logos on the site
const css = readFileSync("src/styles.css", "utf8");
const markSvg = readFileSync("../brand/kerf-logo-v2/Logos/kerf-mark.svg", "utf8");
const markMono = readFileSync("../brand/kerf-logo-v2/Logos/kerf-mark-mono.svg", "utf8");
const icon = encodeURIComponent(readFileSync("../brand/kerf-logo-v2/Logos/kerf-icon.svg", "utf8"));
// Pre-approval pricing copy lives in src/pricing.local.js (gitignored). It is only built into
// dist-draft/ (npm run build:draft). The normal build, which is what gets committed, never contains a price.
let pricing = null;
if (OUT === "dist-draft" && existsSync("src/pricing.local.js")) {
  const pr = await build({ entryPoints: ["src/pricing.local.js"], bundle: true, write: false, format: "esm", logLevel: "silent" });
  pricing = (await import("data:text/javascript;base64," + Buffer.from(pr.outputFiles[0].text).toString("base64"))).default;
}
console.log("pricing draft:", pricing ? "included (local file)" : "not included");
import { TREE } from "./src/content.js";
const meta = {
  index: [TREE.title, TREE.description],
  privacy: ["Privacy. Kerf.", "Kerf privacy page. Pending legal review."],
  terms: ["Terms. Kerf.", "Kerf terms page. Pending legal review."],
};
for (const page of ["index", "privacy", "terms"]) {
  const r = await build({
    entryPoints: ["src/main.jsx"], bundle: true, minify: true, write: false, format: "iife", jsx: "automatic", target: ["es2019"],
    define: { "process.env.NODE_ENV": '"production"', "__KERF_IMAGES__": JSON.stringify(have), "__KERF_LOGOS__": JSON.stringify(logos), "__KERF_PAGE__": JSON.stringify(page), "__KERF_PRICING__": JSON.stringify(pricing), "__KERF_MARK__": JSON.stringify(markSvg), "__KERF_MARK_MONO__": JSON.stringify(markMono) },
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
${page === "index" ? "" : '<meta name="robots" content="noindex">'}
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
  writeFileSync(`${OUT}/${page}.html`, html);
  console.log(page, "built; size KB:", Math.round(html.length / 1024));
}
console.log("images:", Object.keys(have).join(",") || "none", "| logos:", Object.keys(logos).join(",") || "none");
