// Static server for dist on a local port in 8810-8899. Never 8787 or 3100.
import { createServer } from "http";
import { readFileSync, existsSync } from "fs";
import { join, extname } from "path";
const port = Number(process.env.PORT || 8811);
if (port < 8810 || port > 8899) { console.error("PORT must be 8810 to 8899"); process.exit(1); }
const types = { ".html": "text/html; charset=utf-8", ".webp": "image/webp", ".svg": "image/svg+xml", ".mp4": "video/mp4" };
createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (p === "/") p = "/index.html";
  if (p.includes("..")) { res.writeHead(400); return res.end(); }
  const f = join(process.env.DIR || "dist", p);
  if (p === "/api/lead") { res.writeHead(503, { "content-type": "application/json" }); return res.end('{"ok":false}'); }
  if (!existsSync(f)) { res.writeHead(404); return res.end("not found"); }
  res.writeHead(200, { "content-type": types[extname(f)] || "application/octet-stream" });
  res.end(readFileSync(f));
}).listen(port, "127.0.0.1", () => console.log(`kerf site draft on http://127.0.0.1:${port}`));
