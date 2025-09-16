import { promises as fs } from 'fs';
import path from 'path';
import { defaultLocale, locales } from '../lib/i18n';
import { getSiteUrl, getStaticRoutes } from '../lib/seo';

async function main() {
  const baseUrl = getSiteUrl();
  const routes = getStaticRoutes();
  const now = new Date().toISOString();

  const urls = routes
    .flatMap((route) => {
      return locales.map((locale) => {
        const prefix = locale === defaultLocale ? '' : `/${locale}`;
        const url = `${baseUrl}${prefix}${route === '/' ? '' : route}`;
        return `<url><loc>${url}</loc><lastmod>${now}</lastmod></url>`;
      });
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  const target = path.join(process.cwd(), 'public', 'sitemap.xml');
  await fs.writeFile(target, xml, 'utf-8');
  console.info(`Sitemap généré dans ${target}`);
}

main().catch((error) => {
  console.error('Impossible de générer le sitemap');
  console.error(error);
  process.exit(1);
});
