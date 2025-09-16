import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type TagProps = {
  children: ReactNode;
  className?: string;
};

export default function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground',
        className
      )}
    >
      {children}
    </span>
  );
}
