import { getTranslations } from 'next-intl/server';
import Section from '@/components/section';
import { cn } from '@/lib/utils';

const colorGroups = [
  {
    key: 'surfaces',
    tokens: [
      { name: 'background', variable: '--background', swatchClass: 'bg-background', textClass: 'text-foreground' },
      { name: 'foreground', variable: '--foreground', swatchClass: 'bg-foreground', textClass: 'text-background' },
      { name: 'card', variable: '--card', swatchClass: 'bg-card', textClass: 'text-card-foreground' },
      { name: 'card-foreground', variable: '--card-foreground', swatchClass: 'bg-card-foreground', textClass: 'text-card' },
      { name: 'border', variable: '--border', swatchClass: 'bg-border', textClass: 'text-foreground' },
      { name: 'input', variable: '--input', swatchClass: 'bg-input', textClass: 'text-foreground' }
    ]
  },
  {
    key: 'brand',
    tokens: [
      { name: 'primary', variable: '--primary', swatchClass: 'bg-primary', textClass: 'text-primary-foreground' },
      { name: 'primary-foreground', variable: '--primary-foreground', swatchClass: 'bg-primary-foreground', textClass: 'text-primary' },
      { name: 'secondary', variable: '--secondary', swatchClass: 'bg-secondary', textClass: 'text-secondary-foreground' },
      { name: 'secondary-foreground', variable: '--secondary-foreground', swatchClass: 'bg-secondary-foreground', textClass: 'text-secondary' },
      { name: 'accent', variable: '--accent', swatchClass: 'bg-accent', textClass: 'text-accent-foreground' },
      { name: 'accent-foreground', variable: '--accent-foreground', swatchClass: 'bg-accent-foreground', textClass: 'text-accent' }
    ]
  },
  {
    key: 'support',
    tokens: [
      { name: 'muted', variable: '--muted', swatchClass: 'bg-muted', textClass: 'text-muted-foreground' },
      { name: 'muted-foreground', variable: '--muted-foreground', swatchClass: 'bg-muted-foreground', textClass: 'text-muted' },
      { name: 'destructive', variable: '--destructive', swatchClass: 'bg-destructive', textClass: 'text-destructive-foreground' },
      {
        name: 'destructive-foreground',
        variable: '--destructive-foreground',
        swatchClass: 'bg-destructive-foreground',
        textClass: 'text-destructive'
      },
      { name: 'ring', variable: '--ring', swatchClass: 'bg-ring', textClass: 'text-primary-foreground' }
    ]
  }
] as const;

export const revalidate = 3600;

export default async function ColorTestPage() {
  const t = await getTranslations('colorTest');

  return (
    <Section title={t('title')} description={t('description')}>
      <div className="space-y-12">
        {colorGroups.map((group) => (
          <div key={group.key} className="space-y-4">
            <h3 className="text-xl font-semibold tracking-tight">{t(`groups.${group.key}`)}</h3>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {group.tokens.map((token) => (
                <div
                  key={token.name}
                  className="overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm"
                >
                  <div className={cn('flex h-24 flex-col justify-center gap-2 px-4', token.swatchClass, token.textClass)}>
                    <span className="text-sm font-semibold uppercase tracking-wide">{token.name}</span>
                    <span className="text-xs font-mono opacity-80">{token.variable}</span>
                  </div>
                  <div className="border-t border-border px-4 py-3 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-muted-foreground">
                      <span>{t('legend.background')}</span>
                      <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px] text-muted-foreground">
                        {token.swatchClass}
                      </code>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-muted-foreground">
                      <span>{t('legend.foreground')}</span>
                      <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px] text-muted-foreground">
                        {token.textClass}
                      </code>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
