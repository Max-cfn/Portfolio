export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fr';

export const i18n = {
  defaultLocale,
  locales,
  localePrefix: 'as-needed'
} as const;

export default i18n;

export async function getMessages(locale: Locale) {
  switch (locale) {
    case 'fr':
      return (await import('../locales/fr.json')).default;
    case 'en':
      return (await import('../locales/en.json')).default;
    default:
      return (await import('../locales/fr.json')).default;
  }
}
