import { getTranslations } from 'next-intl/server';
import ContactForm from '@/components/contact-form';
import Section from '@/components/section';
import Tag from '@/components/tag';
import { getResume } from '@/lib/resume';

export const revalidate = 3600;

export default async function ContactPage() {
  const [resume, tContact] = await Promise.all([
    getResume(),
    getTranslations('contact')
  ]);

  return (
    <Section title={tContact('title')} description={tContact('subtitle')}>
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6 text-sm text-muted-foreground">
          <p>{resume.basics.summary}</p>
          <div>
            <h3 className="text-base font-semibold text-foreground">{tContact('title')}</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a href={`mailto:${resume.basics.email}`} className="hover:text-primary">
                  {resume.basics.email}
                </a>
              </li>
              <li>{resume.basics.phone}</li>
              <li>{resume.basics.location}</li>
            </ul>
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">{tContact('profiles')}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
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
        </div>
        <div className="rounded-2xl border border-border bg-card/60 p-6 shadow-sm">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}


