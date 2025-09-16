import type { Metadata } from 'next';
import { getResume } from './resume';
import type { Locale } from './i18n';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

export async function buildMetadata(locale: Locale): Promise<Metadata> {
  const resume = await getResume();
  const { name, label, summary } = resume.basics;

  const title = `${name} – ${label}`;
  const description = summary;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: '/',
      languages: {
        fr: '/fr',
        en: '/en'
      }
    },
    openGraph: {
      type: 'website',
      locale,
      url: SITE_URL,
      title,
      description,
      siteName: name,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: name,
      images: ['/og-image.png']
    }
  };
}

export function getSiteUrl() {
  return SITE_URL;
}

export function getStaticRoutes() {
  return ['/', '/experience', '/education', '/projects', '/skills', '/contact', '/blog'];
}
