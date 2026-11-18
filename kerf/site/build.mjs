import { build } from "esbuild";
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync, rmSync } from "fs";

const imgDir = "../images";
const names = ["hero","hero-bg","spar","founder"];
const have = {};
rmSync("dist/images", { recursive: true, force: true });
mkdirSync("dist/images", { recursive: true });
for (const n of names) {
  const p = `${imgDir}/${n}.webp`;
  if (existsSync(p)) { have[n] = true; copyFileSync(p, `dist/images/${n}.webp`); }
}
const logos = {}; // no third-party logos: Kerf supports QuoteIQ and Quo only in the beta
const css = readFileSync("src/styles.css", "utf8");
const icon = encodeURIComponent(readFileSync("../brand/kerf-mark.svg", "utf8"));
const title = "Kerf. No lead goes cold. Built by an arborist.";
const desc = "Kerf sits on top of the CRM and phone you already use, drafts every follow-up in your voice, and waits for your one tap. Built by an arborist for tree care owners.";
for (const page of ["index"]) {
  const r = await build({
    entryPoints: ["src/main.jsx"], bundle: true, minify: true, write: false, format: "iife", jsx: "automatic", target: ["es2019"],
    define: { "process.env.NODE_ENV": '"production"', "__KERF_IMAGES__": JSON.stringify(have), "__KERF_LOGOS__": JSON.stringify(logos), "__KERF_PAGE__": JSON.stringify(page) },
    legalComments: "none",
  });
  const js = r.outputFiles[0].text;
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
rmSync("dist/trades.html", { force: true });
console.log("images:", Object.keys(have).join(",") || "none", "| logos:", Object.keys(logos).join(",") || "none");
