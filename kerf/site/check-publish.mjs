// Publish guard: fails while the booking link is still a placeholder. Run before any real publish.
import { readFileSync } from "fs";
const c = readFileSync("src/content.js", "utf8");
if (/BOOK_IS_PLACEHOLDER\s*=\s*true/.test(c)) { console.error("BLOCKED: BOOK_IS_PLACEHOLDER is true. Set the real booking URL and flip the flag."); process.exit(1); }
console.log("publish check ok");
