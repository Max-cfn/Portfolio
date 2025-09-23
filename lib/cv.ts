import type { Locale } from '@/lib/i18n';

export const CV_STATIC_PATHS: Record<Locale, string> = {
  fr: '/cv/resume-fr.pdf',
  en: '/cv/resume-en.pdf'
} as const;

const CV_FALLBACK_DOWNLOAD_FILENAME = 'CV_CERFONTAINE.pdf';

export const CV_DOWNLOAD_FILENAMES: Record<Locale, string> = {
  fr: 'CV_CERFONTAINE_FR.pdf',
  en: 'CV_CERFONTAINE_EN.pdf'
} as const;

export function getCvPath(locale: Locale) {
  return CV_STATIC_PATHS[locale] ?? CV_STATIC_PATHS.fr;
}

export function getCvDownloadFilename(locale: Locale) {
  return CV_DOWNLOAD_FILENAMES[locale] ?? CV_FALLBACK_DOWNLOAD_FILENAME;
}
