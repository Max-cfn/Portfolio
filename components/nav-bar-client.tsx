'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next-intl/link';
import { usePathname } from 'next-intl/client';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import type { Resume } from '@/lib/resume';
import LangSwitcher from './lang-switcher';
import ThemeToggle from './theme-toggle';

const socialIcons: Record<string, JSX.Element> = {
  github: <Github className="h-4 w-4" aria-hidden="true" />,
  linkedin: <Linkedin className="h-4 w-4" aria-hidden="true" />,
  email: <Mail className="h-4 w-4" aria-hidden="true" />
};

type NavBarClientProps = {
  basics: Resume['basics'];
};

export default function NavBarClient({ basics }: NavBarClientProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const tNav = useTranslations('nav');
  const tActions = useTranslations('actions');

  const items = [
    { href: '/', label: tNav('home') },
    { href: '/experience', label: tNav('experience') },
    { href: '/education', label: tNav('education') },
    { href: '/projects', label: tNav('projects') },
    { href: '/skills', label: tNav('skills') },
    { href: '/contact', label: tNav('contact') }
  ];

  const current = pathname ?? '/';

  const profiles = basics.profiles || [];

  const downloadButton = (
    <Button asChild variant="secondary" className="hidden sm:inline-flex">
      <a href="/api/resume" rel="noopener" download>
        {tActions('downloadResume')}
      </a>
    </Button>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              {basics.name.slice(0, 1)}
            </span>
            <span className="hidden flex-col leading-tight lg:flex">
              <span>{basics.name}</span>
              <span className="text-sm text-muted-foreground">{basics.label}</span>
            </span>
          </Link>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          {items.map((item) => {
            const active = current === item.href || current.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <LangSwitcher />
          <ThemeToggle />
          {downloadButton}
          <div className="flex items-center gap-2">
            {profiles
              .filter((profile) => Boolean(profile.url))
              .map((profile) => {
                const key = profile.network?.toLowerCase() ?? '';
                const icon = socialIcons[key];
                const label = profile.network ?? 'profile';
                return (
                  <Link
                    key={label}
                    href={profile.url ?? '#'}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={label}
                  >
                    {icon ?? (
                      <span className="text-sm font-semibold">
                        {(profile.network ?? '?').slice(0, 1)}
                      </span>
                    )}
                  </Link>
                );
              })}
          </div>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <LangSwitcher />
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setOpen((prev) => !prev)} aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-border bg-background md:hidden"
          >
            <div className="space-y-3 px-4 py-4">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block text-base font-medium text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild variant="secondary" className="w-full">
                <a href="/api/resume" rel="noopener" download>
                  {tActions('downloadResume')}
                </a>
              </Button>
              <div className="flex items-center gap-3">
                {profiles
                  .filter((profile) => Boolean(profile.url))
                  .map((profile) => {
                    const key = profile.network?.toLowerCase() ?? '';
                    const icon = socialIcons[key];
                    const label = profile.network ?? 'profile';
                    return (
                      <Link
                        key={label}
                        href={profile.url ?? '#'}
                        target="_blank"
                        rel="noopener"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground"
                        aria-label={label}
                      >
                        {icon ?? (
                          <span className="text-sm font-semibold">
                            {(profile.network ?? '?').slice(0, 1)}
                          </span>
                        )}
                      </Link>
                    );
                  })}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
