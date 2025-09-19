import { Link } from '@/lib/navigation';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/lib/i18n';
import { getCvPath, CV_DOWNLOAD_FILENAME } from '@/lib/cv';
import { getResume, getAllKeywords } from '@/lib/resume';
import Section from '@/components/section';
import Tag from '@/components/tag';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function HomeContent({ locale }: { locale: Locale }) {
  unstable_setRequestLocale(locale);

  const [
    resume,
    keywords,
    tHero,
    tProjects,
    tExperience,
    tActions,
    tContact,
    tBasics
  ] = await Promise.all([
    getResume(),
    getAllKeywords(locale),
    getTranslations({ namespace: 'hero', locale }),
    getTranslations({ namespace: 'projects', locale }),
    getTranslations({ namespace: 'experience', locale }),
    getTranslations({ namespace: 'actions', locale }),
    getTranslations({ namespace: 'contact', locale }),
    getTranslations({ namespace: 'basics', locale })
  ]);

  const featuredExperience = resume.work.slice(0, 3);
  const featuredProjects = (resume.projects ?? []).slice(0, 3);
  const cvPath = getCvPath(locale);

  return (
    <>
      <section className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-20 sm:px-6 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-6">
          <p className="text-sm uppercase tracking-[0.2em] text-primary">{tHero('greeting')}</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {resume.basics.name}
          </h1>
          <h2 className="text-2xl font-semibold text-muted-foreground sm:text-3xl">
            {resume.basics.label}
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">{resume.basics.summary}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/contact">{tHero('cta')}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={cvPath} download={CV_DOWNLOAD_FILENAME}>
                {tActions('downloadResume')}
              </a>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {keywords.slice(0, 8).map((keyword) => (
              <Tag key={keyword}>{keyword}</Tag>
            ))}
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <div className="rounded-3xl border border-border bg-card/70 p-6 shadow-xl backdrop-blur">
            <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-muted-foreground">{tBasics('email')}</dt>
                <dd>
                  <span className="hover:text-primary">{resume.basics.email}</span>
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">{tBasics('phone')}</dt>
                <dd>{resume.basics.phone}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">{tBasics('location')}</dt>
                <dd>{resume.basics.location}</dd>
              </div>
              {resume.basics.profiles.slice(0, 2).map((profile) => (
                <div key={profile.network}>
                  <dt className="text-muted-foreground">{profile.network}</dt>
                  <dd>
                    <a href={profile.url ?? '#'} target="_blank" rel="noopener" className="hover:text-primary">
                      {profile.url ?? profile.username}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <Section title={tExperience('title')} description={tHero('availability')}>
        <div className="grid gap-6 md:grid-cols-3">
          {featuredExperience.map((job) => (
            <Card key={`${job.name}-${job.position}`} className="h-full">
              <CardHeader>
                <CardTitle>{job.position}</CardTitle>
                <CardDescription>
                  {job.name}
                  {job.location ? ` - ${job.location}` : ''}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{job.summary}</p>
                {job.highlights.length > 0 && (
                  <ul className="space-y-2 text-sm text-foreground/80">
                    {job.highlights.slice(0, 3).map((highlight) => (
                      <li key={highlight} className="flex gap-2">
                        <span aria-hidden="true">-</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {job.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {job.keywords.slice(0, 5).map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section title={tProjects('title')} description={tProjects('subtitle')}>
        {featuredProjects.length === 0 ? (
          <p className="text-muted-foreground">{tProjects('empty')}</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {featuredProjects.map((project) => (
              <Card key={project.name} className="h-full">
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {project.highlights && project.highlights.length > 0 && (
                    <ul className="space-y-2 text-sm text-foreground/80">
                      {project.highlights.slice(0, 3).map((highlight) => (
                        <li key={highlight} className="flex gap-2">
                          <span aria-hidden="true">-</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {project.keywords && project.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.keywords.slice(0, 5).map((keyword) => (
                        <Tag key={keyword}>{keyword}</Tag>
                      ))}
                    </div>
                  )}
                  {project.url && (
                    <Button asChild variant="outline" size="sm">
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

      <Section title={tContact('title')} description={tContact('subtitle')}>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>{resume.basics.summary}</p>
          <p>{tContact('downloadDescription')}</p>
          <p>{tContact('downloadNote')}</p>
          <Button asChild className="w-full sm:w-auto">
            <a href={cvPath} download={CV_DOWNLOAD_FILENAME}>
              {tContact('downloadCta')}
            </a>
          </Button>
          {resume.basics.profiles.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-foreground">{tContact('profiles')}</h3>
              <div className="flex flex-wrap gap-2">
                {resume.basics.profiles
                  .filter((profile) => Boolean(profile.url))
                  .map((profile) => (
                    <Tag key={profile.network}>
                      <a href={profile.url ?? '#'} target="_blank" rel="noopener" className="hover:text-primary">
                        {profile.network}
                      </a>
                    </Tag>
                  ))}
              </div>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
