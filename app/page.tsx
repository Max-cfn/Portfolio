import HomeContent from './_components/home-content';
import { defaultLocale } from '@/lib/i18n';

export const dynamic = 'force-static';

export default function Page() {
  return <HomeContent locale={defaultLocale} />;
}
