'use client';

import { useMemo, useState } from 'react';
import Timeline from '@/components/timeline';
import { Button } from '@/components/ui/button';

type ExperienceEntry = {
  title: string;
  subtitle: string;
  location?: string;
  period: string;
  description: string;
  highlights: string[];
  tags: string[];
};

type ExperienceTimelineProps = {
  entries: ExperienceEntry[];
  tags: string[];
  filterLabel: string;
  allLabel: string;
};

export default function ExperienceTimeline({ entries, tags, filterLabel, allLabel }: ExperienceTimelineProps) {
  const [activeTag, setActiveTag] = useState<string>('');

  const filteredEntries = useMemo(() => {
    if (!activeTag) {
      return entries;
    }
    return entries.filter((entry) => entry.tags.includes(activeTag));
  }, [entries, activeTag]);

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-3 text-sm font-medium uppercase text-muted-foreground">{filterLabel}</p>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant={activeTag === '' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTag('')}
          >
            {allLabel}
          </Button>
          {tags.map((tag) => (
            <Button
              key={tag}
              type="button"
              variant={activeTag === tag ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTag((current) => (current === tag ? '' : tag))}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>
      <Timeline items={filteredEntries} className="mt-8" />
    </div>
  );
}
