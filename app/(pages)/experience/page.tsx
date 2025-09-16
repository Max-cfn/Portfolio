import { getLocale, getTranslations } from 'next-intl/server';
import ExperienceTimeline from '@/components/experience-timeline';
import Section from '@/components/section';
import { formatDateRange } from '@/lib/date';
import { getResume } from '@/lib/resume';
import type { Locale } from '@/lib/i18n';

export const revalidate = 3600;

export default async function ExperiencePage() {
  const [resume, locale, tExperience] = await Promise.all([
    getResume(),
    getLocale(),
    getTranslations('experience')
  ]);

  const typedLocale = locale as Locale;

  const entries = resume.work.map((job) => ({
    title: job.position,
    subtitle: job.name,
    location: job.location,
    period: formatDateRange(job.startDate, job.endDate ?? undefined, typedLocale),
    description: job.summary,
    highlights: job.highlights,
    tags: job.keywords
  }));

  const tags = Array.from(new Set(entries.flatMap((entry) => entry.tags).filter(Boolean))).sort((a, b) => a.localeCompare(b, locale));

  return (
    <Section
      title={tExperience('title')}
      description={tExperience('description')}
    >
      <ExperienceTimeline
        entries={entries}
        tags={tags}
        filterLabel={tExperience('filterLabel')}
        allLabel={tExperience('all')}
      />
    </Section>
  );
}







