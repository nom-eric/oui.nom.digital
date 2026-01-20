import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const TARGET_DIRS = ["src"]; // ajuste si besoin

const extsToEdit = new Set([".astro", ".md", ".mdx", ".html"]);
const skipExt = /\.(css|js|mjs|cjs|png|jpg|jpeg|webp|svg|gif|ico|pdf|xml|json|txt|woff2?|ttf|eot|map)$/i;

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === "node_modules" || ent.name === "dist" || ent.name.startsWith(".")) continue;
      walk(p, out);
    } else {
      const ext = path.extname(ent.name).toLowerCase();
      if (extsToEdit.has(ext)) out.push(p);
    }
  }
  return out;
}

// Corrige href="/foo" -> href="/foo/" pour les liens internes "propres"
// - ne touche pas: "/", "#", "?...", "http", "mailto", "tel"
// - ne touche pas: fichiers avec extension (/rss.xml, /image.png)
// - ne touche pas: déjà en "/"
const re = /(href|to)=["'](\/(?!\/)[^"'?#]*)(["'])/g;

let changedFiles = 0;
let changedLinks = 0;

for (const base of TARGET_DIRS) {
  const dir = path.join(ROOT, base);
  if (!fs.existsSync(dir)) continue;

  for (const file of walk(dir)) {
    const before = fs.readFileSync(file, "utf8");
    let after = before;

    after = after.replace(re, (m, attr, url, quote) => {
      if (url === "/") return m;
      if (url.endsWith("/")) return m;
      if (skipExt.test(url)) return m;
      // ajoute le slash
      changedLinks++;
      return `${attr}="${url}/"${quote === "'" ? "" : ""}`.replace(/"'/g, "'"); // garde simple
    });

    if (after !== before) {
      fs.writeFileSync(file, after, "utf8");
      changedFiles++;
    }
  }
}

console.log(`Fichiers modifiés: ${changedFiles}`);
console.log(`Liens corrigés: ${changedLinks}`);
