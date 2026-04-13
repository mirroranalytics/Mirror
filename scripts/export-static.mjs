import { copyFileSync, cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join, extname } from "node:path";

const distDir = "dist";
const docsDir = "docs";

if (!existsSync(distDir)) {
  throw new Error("dist folder not found. Run the Vite build before exporting static files.");
}

rmSync(docsDir, { recursive: true, force: true });
mkdirSync(docsDir, { recursive: true });
cpSync(distDir, docsDir, { recursive: true });
copyFileSync(`${docsDir}/index.html`, `${docsDir}/404.html`);

const mimeTypes = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
};

// Build a map of asset filenames to base64 data URIs
const assetDir = join(docsDir, "assets");
const assetMap = {};
if (existsSync(assetDir)) {
  for (const file of readdirSync(assetDir)) {
    const ext = extname(file).toLowerCase();
    const mime = mimeTypes[ext];
    if (mime) {
      const data = readFileSync(join(assetDir, file));
      assetMap[file] = `data:${mime};base64,${data.toString("base64")}`;
    }
  }
}

const inlineBuiltHtml = (filePath) => {
  let html = readFileSync(filePath, "utf8");

  // Inline CSS
  html = html.replace(/<link rel="stylesheet" crossorigin href="\.\/assets\/([^\"]+)">/, (_, cssFile) => {
    let css = readFileSync(`${docsDir}/assets/${cssFile}`, "utf8");
    // Replace url(./filename) references in CSS with base64
    css = css.replace(/url\(\.\/([^)]+)\)/g, (match, assetName) => {
      if (assetMap[assetName]) return `url(${assetMap[assetName]})`;
      return match;
    });
    return `<style>${css}</style>`;
  });

  // Inline JS
  html = html.replace(/<script type="module" crossorigin src="\.\/assets\/([^\"]+)"><\/script>/, (_, jsFile) => {
    let js = readFileSync(`${docsDir}/assets/${jsFile}`, "utf8");
    // Replace asset references in JS - Vite may use various path patterns
    for (const [filename, dataUri] of Object.entries(assetMap)) {
      js = js.replaceAll(`"./assets/${filename}"`, `"${dataUri}"`);
      js = js.replaceAll(`'./assets/${filename}'`, `'${dataUri}'`);
      js = js.replaceAll(`"/assets/${filename}"`, `"${dataUri}"`);
      js = js.replaceAll(`"${filename}"`, `"${dataUri}"`);
      js = js.replaceAll(`new URL("${filename}",import.meta.url).href`, `"${dataUri}"`);
      js = js.replaceAll(`new URL('./assets/${filename}',import.meta.url).href`, `"${dataUri}"`);
      js = js.replaceAll(`new URL("./assets/${filename}",import.meta.url).href`, `"${dataUri}"`);
      js = js.replaceAll(`new URL('/assets/${filename}',import.meta.url).href`, `"${dataUri}"`);
      js = js.replaceAll(`new URL("/assets/${filename}",import.meta.url).href`, `"${dataUri}"`);
    }
    js = js.replaceAll("import.meta.url", '""');
    return `<script type="module">${js}</script>`;
  });

  writeFileSync(filePath, html);
};

inlineBuiltHtml(`${docsDir}/index.html`);
inlineBuiltHtml(`${docsDir}/404.html`);
