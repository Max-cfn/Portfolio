'use client';

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type KeyboardEvent as ReactKeyboardEvent
} from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { getCvDownloadFilename, getCvPath } from '@/lib/cv';
import { locales, type Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

type ButtonVariant = NonNullable<ComponentProps<typeof Button>['variant']>;
type ButtonSize = NonNullable<ComponentProps<typeof Button>['size']>;

type CvDownloadMenuProps = {
  align?: 'start' | 'end';
  buttonClassName?: string;
  className?: string;
  label?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

const alignmentClassNames: Record<NonNullable<CvDownloadMenuProps['align']>, string> = {
  start: 'left-0',
  end: 'right-0'
};

export default function CvDownloadMenu({
  align = 'end',
  buttonClassName,
  className,
  label,
  size = 'default',
  variant = 'default'
}: CvDownloadMenuProps) {
  const tActions = useTranslations('actions');
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const optionRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const focusTargetRef = useRef(0);
  const baseId = useId();
  const menuId = `${baseId}-menu`;
  const triggerId = `${baseId}-trigger`;

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const prompt = tActions('chooseResumeLanguage');
  const resumeLabels = useMemo<Record<Locale, string>>(
    () => ({
      fr: tActions('downloadResumeFrench'),
      en: tActions('downloadResumeEnglish')
    }),
    [tActions]
  );

  const options = useMemo(
    () =>
      locales.map((optionLocale) => ({
        locale: optionLocale,
        href: getCvPath(optionLocale),
        download: getCvDownloadFilename(optionLocale),
        label: resumeLabels[optionLocale]
      })),
    [resumeLabels]
  );

  const focusOption = (index: number) => {
    const total = optionRefs.current.length;
    if (total === 0) {
      return;
    }

    const normalizedIndex = ((index % total) + total) % total;
    focusTargetRef.current = normalizedIndex;
    optionRefs.current[normalizedIndex]?.focus();
  };

  const openMenu = (focusIndex = 0) => {
    focusTargetRef.current = focusIndex;
    setOpen(true);
  };

  const handleToggle = () => {
    if (open) {
      handleClose();
    } else {
      openMenu();
    }
  };

  const handleTriggerKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (open) {
        focusOption(focusTargetRef.current);
      } else {
        openMenu(0);
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (open) {
        focusOption(focusTargetRef.current);
      } else {
        openMenu(options.length - 1);
      }
    }
  };

  const handleClose = () => {
    focusTargetRef.current = 0;
    setOpen(false);
  };

  const handleMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (!open) {
      return;
    }

    const { key, target } = event;
    const currentIndex = optionRefs.current.findIndex((item) => item === target);

    if (key === 'ArrowDown') {
      event.preventDefault();
      focusOption(currentIndex + 1);
    } else if (key === 'ArrowUp') {
      event.preventDefault();
      focusOption(currentIndex - 1);
    } else if (key === 'Home') {
      event.preventDefault();
      focusOption(0);
    } else if (key === 'End') {
      event.preventDefault();
      focusOption(options.length - 1);
    } else if (key === 'Tab') {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (!open) {
      optionRefs.current = [];
      return;
    }

    const frame = requestAnimationFrame(() => {
      const total = optionRefs.current.length;
      if (total === 0) {
        return;
      }

      const targetIndex = Math.min(Math.max(focusTargetRef.current, 0), total - 1);
      optionRefs.current[targetIndex]?.focus();
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [open]);

  const triggerLabel = label ?? tActions('downloadResume');

  return (
    <div className={cn('relative', className)} ref={rootRef}>
      <Button
        ref={buttonRef}
        type="button"
        variant={variant}
        size={size}
        className={cn('gap-2', buttonClassName)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        id={triggerId}
        onClick={handleToggle}
        onKeyDown={handleTriggerKeyDown}
      >
        {triggerLabel}
        <ChevronDown
          className={cn('h-4 w-4 transition-transform duration-200', open && 'rotate-180')}
          aria-hidden="true"
        />
      </Button>
      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-label={prompt}
          aria-labelledby={triggerId}
          className={cn(
            'absolute z-50 mt-2 w-full min-w-[12rem] overflow-hidden rounded-md border border-border bg-card shadow-lg',
            alignmentClassNames[align]
          )}
          onKeyDown={handleMenuKeyDown}
        >
          <p className="px-3 pt-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">{prompt}</p>
          <div className="py-1">
            {options.map((option, index) => (
              <a
                key={option.locale}
                role="menuitem"
                href={option.href}
                download={option.download}
                rel="noopener"
                className="block px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                ref={(node) => {
                  optionRefs.current[index] = node;
                }}
                onClick={handleClose}
              >
                {option.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
