import HomeContent from '../_components/home-content';
import { locales, type Locale } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  params: { locale: Locale };
};

export default function LocaleHome({ params }: Props) {
  return <HomeContent locale={params.locale} />;
}
