import { getTranslations } from 'next-intl/server';
import Section from '@/components/section';

export const revalidate = 3600;

export default async function BlogPage() {
  const tBlog = await getTranslations('blog');

  return (
    <Section title={tBlog('title')} description={tBlog('description')}>
      <div className="rounded-2xl border border-dashed border-border bg-card/40 p-10 text-center">
        <p className="text-lg text-muted-foreground">{tBlog('comingSoon')}</p>
      </div>
    </Section>
  );
}
