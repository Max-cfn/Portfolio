import type { Locale } from './i18n';

export function formatResumeDate(value: string | null | undefined, locale: Locale) {
  if (!value) {
    return locale === 'fr' ? 'Présent' : 'Present';
  }

  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, (month ?? 1) - 1, day ?? 1);

  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    year: 'numeric'
  }).format(date);
}

export function formatDateRange(
  startDate: string,
  endDate: string | null | undefined,
  locale: Locale
) {
  const start = formatResumeDate(startDate, locale);
  const end = formatResumeDate(endDate ?? undefined, locale);
  return `${start} – ${end}`;
}

