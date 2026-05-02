'use client';

import type * as React from 'react';
import { cn } from '../lib/utils';

export function Keycap({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'rounded-sm border border-black/10 bg-black/10 px-1.5 py-0.5 font-semibold text-[10px] text-accent-foreground/80 leading-none',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
