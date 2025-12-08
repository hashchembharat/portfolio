import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";

const baseUrl = process.env.SITE_URL || "https://haschembharat.com/";
const staticRoutes = ["/", "/products", "/contact"];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsPath = path.resolve(__dirname, "../public/assets/data/products.json");
let products = [];
if (fs.existsSync(productsPath)) {
  try {
    products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
  } catch (err) {
    console.warn("Failed to parse products.json:", err.message);
  }
}

const slugify = (str = "") =>
    (str || "")
      .normalize?.("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .replace(/-{2,}/g, "-");
  
const urls = [
  ...staticRoutes.map((p) => ({ url: p, changefreq: "weekly", priority: 0.8 })),
  ...products.map((p) => ({
    url: `/products-details/${slugify(p.impurityName)}`,
    lastmodISO: p.updatedAt || undefined,
    changefreq: "monthly",
    priority: 0.6,
  })),
];

async function buildSitemap() {
  const outPath = path.resolve(__dirname, "../public/sitemap.xml");
  const stream = new SitemapStream({ hostname: baseUrl });
  const xml = await streamToPromise(Readable.from(urls).pipe(stream));
  fs.writeFileSync(outPath, xml.toString());
  console.log("Sitemap written to", outPath);
}

buildSitemap().catch((err) => {
  console.error("Failed to build sitemap:", err);
  process.exit(1);
});