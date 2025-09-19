'use client';

import { Globe } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter, type AppPathname } from '@/lib/navigation';
import { locales, type Locale } from '@/lib/i18n';

const supportedPathnames: AppPathname[] = [
  '/',
  '/experience',
  '/education',
  '/projects',
  '/skills',
  '/color-test',
  '/contact',
  '/blog'
];
const fallbackPathname: AppPathname = '/';

export default function LangSwitcher() {
  const locale = useLocale();
  const tLang = useTranslations('languages');
  const tActions = useTranslations('actions');
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (nextLocale: Locale) => {
    if (nextLocale === locale) {
      return;
    }

    const rawPath = pathname ?? fallbackPathname;
    const localePattern = new RegExp(`^/(${locales.join('|')})(?=/|$)`, 'i');
    const strippedPath = rawPath.replace(localePattern, '');
    const normalizedPath = strippedPath === '' ? '/' : strippedPath;
    const sanitizedPath = normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`;
    const candidate = sanitizedPath as AppPathname;
    const targetPath = supportedPathnames.includes(candidate) ? candidate : fallbackPathname;

    router.replace(targetPath, { locale: nextLocale });
  };

  return (
    <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
      <Globe className="h-5 w-5" aria-hidden="true" />
      <span className="sr-only">{tActions('language')}</span>
      <select
        className="rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:bg-muted"
        style={{ backgroundColor: 'hsl(var(--card))', color: 'hsl(var(--foreground))' }}
        value={locale}
        onChange={(event) => handleChange(event.target.value as Locale)}
        aria-label={tActions('language')}
      >
        {locales.map((code) => (
          <option
            key={code}
            value={code}
            className="bg-card text-foreground"
            style={{ backgroundColor: 'hsl(var(--card))', color: 'hsl(var(--foreground))' }}
          >
            {tLang(code as 'fr' | 'en')}
          </option>
        ))}
      </select>
    </label>
  );
}
