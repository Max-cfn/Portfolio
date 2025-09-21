'use client';

import { useTransition } from 'react';
import { Globe } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter, type AppPathname } from '@/lib/navigation';
import { locales, type Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

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
  const [isPending, startTransition] = useTransition();

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

    startTransition(() => {
      (async () => {
        try {
          await router.replace(targetPath, { locale: nextLocale });
        } finally {
          router.refresh();
        }
      })();
    });
  };

  return (
    <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
      <Globe className="h-5 w-5" aria-hidden="true" />
      <span className="sr-only">{tActions('language')}</span>
      <div
        role="group"
        aria-label={tActions('language')}
        aria-busy={isPending}
        className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1 shadow-sm"
      >
        {locales.map((code) => {
          const isActive = code === locale;
          const isDisabled = isActive || isPending;

          return (
            <button
              key={code}
              type="button"
              onClick={() => handleChange(code)}
              disabled={isDisabled}
              aria-pressed={isActive}
              aria-label={tLang(code as 'fr' | 'en')}
              className={cn(
                'min-w-[2.5rem] rounded-full px-3 py-1 text-xs font-semibold uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed',
                isActive
                  ? 'bg-foreground text-background shadow'
                  : 'bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              {code.toUpperCase()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
