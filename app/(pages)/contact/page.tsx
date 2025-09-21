import { getLocale, getTranslations } from "next-intl/server";
import Section from "@/components/section";
import Tag from "@/components/tag";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";
import { getCvPath, CV_DOWNLOAD_FILENAME } from "@/lib/cv";
import { getResume } from "@/lib/resume";

export const revalidate = 3600;

export default async function ContactPage() {
  const [resume, locale, tContact] = await Promise.all([
    getResume(),
    getLocale(),
    getTranslations("contact")
  ]);

  const typedLocale = locale as Locale;
  const cvPath = getCvPath(typedLocale);

  const profiles = resume.basics.profiles?.filter((profile) => Boolean(profile.url)) ?? [];

  return (
    <Section title={tContact("title")} description={tContact("subtitle")}>
      <div className="space-y-10 text-sm text-muted-foreground">
        <div className="space-y-4">
          <p>{tContact("downloadDescription")}</p>
          <p>{tContact("downloadNote")}</p>
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a href={cvPath} download={CV_DOWNLOAD_FILENAME}>
              {tContact("downloadCta")}
            </a>
          </Button>
        </div>

        {profiles.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-foreground">{tContact("profiles")}</h3>
            <div className="flex flex-wrap gap-2">
              {profiles.map((profile) => (
                <Tag key={profile.network}>
                  <a href={profile.url ?? "#"} target="_blank" rel="noopener" className="hover:text-primary">
                    {profile.network}
                  </a>
                </Tag>
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
