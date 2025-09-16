import { defaultLocale, locales } from '@/lib/i18n';
import { getSiteUrl, getStaticRoutes } from '@/lib/seo';

export default function sitemap() {
  const baseUrl = getSiteUrl();
  const routes = getStaticRoutes();
  const now = new Date();

  const entries = routes.flatMap((route) => {
    return locales.map((locale) => {
      const prefix = locale === defaultLocale ? '' : `/${locale}`;
      return {
        url: `${baseUrl}${prefix}${route === '/' ? '' : route}`,
        lastModified: now
      };
    });
  });

  return entries;
}
