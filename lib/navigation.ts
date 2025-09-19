import { createLocalizedPathnamesNavigation, type Pathnames } from 'next-intl/navigation';
import i18n from '@/lib/i18n';

const pathnames = {
  '/': '/',
  '/experience': '/experience',
  '/education': '/education',
  '/projects': '/projects',
  '/skills': '/skills',
  '/contact': '/contact',
  '/blog': '/blog',
  '/color-test': '/color-test'
} satisfies Pathnames<typeof i18n.locales>;

export type AppPathname = keyof typeof pathnames;

export const {
  Link,
  usePathname,
  useRouter,
  redirect,
  permanentRedirect
} = createLocalizedPathnamesNavigation({
  locales: i18n.locales,
  localePrefix: i18n.localePrefix,
  pathnames
});
