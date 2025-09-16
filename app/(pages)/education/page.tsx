import { getLocale, getTranslations } from 'next-intl/server';
import Section from '@/components/section';
import Timeline from '@/components/timeline';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Tag from '@/components/tag';
import { formatDateRange, formatResumeDate } from '@/lib/date';
import { getResume } from '@/lib/resume';
import type { Locale } from '@/lib/i18n';

export const revalidate = 3600;

export default async function EducationPage() {
  const [resume, locale, tEducation] = await Promise.all([
    getResume(),
    getLocale(),
    getTranslations('education')
  ]);

  const typedLocale = locale as Locale;

  const educationItems = resume.education.map((edu) => ({
    title: edu.institution,
    subtitle: `${edu.studyType} · ${edu.area}`,
    location: edu.location,
    period: formatDateRange(edu.startDate, edu.endDate, typedLocale),
    description: edu.score,
    highlights: [],
    tags: []
  }));

  return (
    <Section title={tEducation('title')}>
      <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
        <Timeline items={educationItems} />
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold">{tEducation('certifications')}</h3>
            <div className="mt-4 space-y-3">
              {resume.certificates.map((certificate) => (
                <Card key={certificate.name}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{certificate.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1 text-sm text-muted-foreground">
                    <p>{certificate.issuer}</p>
                    {certificate.date && (
                      <Tag className="inline-block">
                        {formatResumeDate(certificate.date, typedLocale)}
                      </Tag>
                    )}
                    {certificate.score && <p>{certificate.score}</p>}
                    {certificate.url && (
                      <a href={certificate.url} target="_blank" rel="noopener" className="text-primary">
                        {certificate.url}
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          {resume.languages.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold">{tEducation('languages')}</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {resume.languages.map((language) => (
                  <li key={language.language}>
                    <span className="font-medium text-foreground">{language.language}</span>{' '}
                    – {language.fluency}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

