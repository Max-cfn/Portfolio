import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SectionProps = {
  id?: string;
  title: string;
  description?: string;
  className?: string;
  children: ReactNode;
};

export default function Section({ id, title, description, className, children }: SectionProps) {
  return (
    <section id={id} className={cn('mx-auto max-w-6xl px-4 py-16 sm:px-6', className)}>
      <div className="mb-10 space-y-2">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        {description && <p className="text-lg text-muted-foreground">{description}</p>}
      </div>
      {children}
    </section>
  );
}
