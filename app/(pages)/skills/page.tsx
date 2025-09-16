import { getTranslations } from 'next-intl/server';
import Section from '@/components/section';
import Tag from '@/components/tag';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSkillsByCategory } from '@/lib/resume';

export const revalidate = 3600;

export default async function SkillsPage() {
  const [skillsByCategory, tSkills] = await Promise.all([
    getSkillsByCategory(),
    getTranslations('skills')
  ]);

  const preferredOrder = ['Cloud', 'DevOps', 'IaC', 'Outils'];
  const categories = Object.entries(skillsByCategory).sort(([a], [b]) => {
    const indexA = preferredOrder.indexOf(a);
    const indexB = preferredOrder.indexOf(b);
    if (indexA === -1 && indexB === -1) return a.localeCompare(b, 'fr');
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  return (
    <Section title={tSkills('title')}>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {categories.map(([category, items]) => (
          <Card key={category} className="h-full">
            <CardHeader>
              <CardTitle>{category}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{skill.name}</span>
                    {skill.level && (
                      <span className="text-muted-foreground">
                        {tSkills('level')}: {skill.level}
                      </span>
                    )}
                  </div>
                  {skill.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {skill.keywords.map((keyword) => (
                        <Tag key={keyword}>{keyword}</Tag>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}


