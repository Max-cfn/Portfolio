'use client';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type TimelineHighlight = string | ReactNode;

type TimelineItem = {
  title: string;
  subtitle?: string;
  location?: string;
  period?: string;
  description?: string;
  highlights?: TimelineHighlight[];
  tags?: string[];
};

type TimelineProps = {
  items: TimelineItem[];
  className?: string;
};

export default function Timeline({ items, className }: TimelineProps) {
  return (
    <ol className={cn('relative border-l border-border', className)}>
      {items.map((item, index) => (
        <li key={`${item.title}-${index}`} className="mb-10 ml-6">
          <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground ring-8 ring-background">
            {index + 1}
          </span>
          <div className="space-y-2 rounded-xl border border-border bg-card/50 p-6 shadow-sm">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <h3 className="text-xl font-semibold leading-tight">{item.title}</h3>
                {item.subtitle && <p className="text-sm text-muted-foreground">{item.subtitle}</p>}
              </div>
              {item.period && <span className="text-xs font-medium uppercase text-muted-foreground">{item.period}</span>}
            </div>
            {item.location && <p className="text-sm text-muted-foreground">{item.location}</p>}
            {item.description && <p className="text-sm text-foreground/80">{item.description}</p>}
            {item.highlights && item.highlights.length > 0 && (
              <ul className="list-disc space-y-1 pl-5 text-sm text-foreground/80">
                {item.highlights.map((highlight, highlightIndex) => (
                  <li key={highlightIndex}>{highlight}</li>
                ))}
              </ul>
            )}
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

