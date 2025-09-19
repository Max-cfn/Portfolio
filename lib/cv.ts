import type { Locale } from '@/lib/i18n';

export const CV_STATIC_PATHS: Record<Locale, string> = {
  fr: '/resume-fr.pdf',
  en: '/resume-en.pdf'
} as const;

export const CV_DOWNLOAD_FILENAME = 'CV_CERFONTAINE.pdf';

export function getCvPath(locale: Locale) {
  return CV_STATIC_PATHS[locale] ?? CV_STATIC_PATHS.fr;
}
