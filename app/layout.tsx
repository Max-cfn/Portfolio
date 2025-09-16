import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider, useLocale, useMessages, useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import './globals.css';
import Footer from '@/components/footer';
import NavBar from '@/components/nav-bar';
import { ThemeProvider } from '@/components/theme-provider';
import { defaultLocale, locales, type Locale } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

type RootLayoutProps = {
  children: ReactNode;
};

function Providers({ children }: { children: ReactNode }) {
  const locale = useLocale();
  const messages = useMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Paris">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const headerList = headers();
  const headerLocale =
    (headerList.get('x-intl-locale') ??
      headerList.get('x-next-intl-locale') ??
      headerList.get('x-middleware-locale')) as Locale | null;
  const locale = headerLocale && locales.includes(headerLocale) ? headerLocale : defaultLocale;
  return buildMetadata(locale);
}

export default function RootLayout({ children }: RootLayoutProps) {
  const locale = useLocale();
  const t = useTranslations('actions');

  return (
    <html lang={locale} className={`${inter.variable}`} suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        <Providers>
          <a href="#content" className="skip-link">
            {t('skip')}
          </a>
          <div className="flex min-h-screen flex-col">
            <NavBar />
            <main id="content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
