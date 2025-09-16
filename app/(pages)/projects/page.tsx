import { getLocale, getTranslations } from 'next-intl/server';
import Section from '@/components/section';
import Tag from '@/components/tag';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDateRange } from '@/lib/date';
import { getResume } from '@/lib/resume';
import type { Locale } from '@/lib/i18n';

export const revalidate = 3600;

export default async function ProjectsPage() {
  const [resume, locale, tProjects, tActions] = await Promise.all([
    getResume(),
    getLocale(),
    getTranslations('projects'),
    getTranslations('actions')
  ]);

  const typedLocale = locale as Locale;
  const projects = resume.projects ?? [];

  return (
    <Section title={tProjects('title')} description={tProjects('subtitle')}>
      {projects.length === 0 ? (
        <p className="text-muted-foreground">{tProjects('empty')}</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.name} className="flex h-full flex-col">
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4 text-sm text-muted-foreground">
                {project.startDate && (
                  <p>
                    {formatDateRange(project.startDate, project.endDate, typedLocale)}
                  </p>
                )}
                {project.highlights && project.highlights.length > 0 && (
                  <ul className="space-y-2">
                    {project.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2 text-foreground/80">
                        <span aria-hidden="true">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {project.keywords && project.keywords.length > 0 && (
                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.keywords.map((keyword) => (
                      <Tag key={keyword}>{keyword}</Tag>
                    ))}
                  </div>
                )}
                {project.url && (
                  <Button asChild variant="outline" size="sm" className="self-start">
                    <a href={project.url} target="_blank" rel="noopener">
                      {tActions('readMore')}
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </Section>
  );
}
