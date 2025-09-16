import Link from 'next-intl/link';
import { getTranslations } from 'next-intl/server';
import { getResume } from '@/lib/resume';
import { getSiteUrl, getStaticRoutes } from '@/lib/seo';

export default async function Footer() {
  const resume = await getResume();
  const tFooter = await getTranslations('footer');
  const tNav = await getTranslations('nav');

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:justify-between">
        <div className="max-w-md space-y-3">
          <p className="text-base font-semibold">{resume.basics.name}</p>
          <p className="text-sm text-muted-foreground">{resume.basics.summary}</p>
          <p className="text-sm text-muted-foreground">{tFooter('madeWith')}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {tNav('contact')}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {resume.basics.email && (
                <li>
                  <a href={`mailto:${resume.basics.email}`} className="hover:text-foreground">
                    {resume.basics.email}
                  </a>
                </li>
              )}
              {resume.basics.phone && <li>{resume.basics.phone}</li>}
              {resume.basics.location && <li>{resume.basics.location}</li>}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {tFooter('navigation')}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {getStaticRoutes().map((route) => {
                const key = route === '/' ? 'home' : route.replace('/', '');
                const navKey = key as Parameters<typeof tNav>[0];
                return (
                  <li key={route}>
                    <Link href={route} className="hover:text-foreground">
                      {tNav(navKey)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-muted px-4 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {resume.basics.name} ·{' '}
        <a href={getSiteUrl()} target="_blank" rel="noopener" className="hover:text-foreground">
          {getSiteUrl()}
        </a>
      </div>
    </footer>
  );
}
