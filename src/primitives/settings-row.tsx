'use client';

import type { ReactNode } from 'react';
import { cn } from '../lib/utils';

interface SettingsRowProps {
  label: string;
  htmlFor?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function SettingsRow({
  label,
  htmlFor,
  description,
  children,
  className,
}: SettingsRowProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 border-border border-b py-2.5',
        className
      )}
    >
      <div className="min-w-0">
        {htmlFor ? (
          <label htmlFor={htmlFor} className="cursor-pointer select-none text-primary text-sm">
            {label}
          </label>
        ) : (
          <span className="text-primary text-sm">{label}</span>
        )}
        {description && <p className="mt-0.5 text-muted-foreground text-xs">{description}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}
