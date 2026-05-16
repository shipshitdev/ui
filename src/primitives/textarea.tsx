'use client';

import * as React from 'react';
import { cn } from '../lib/utils';

export type TextareaProps = React.ComponentPropsWithoutRef<'textarea'> & {
  mono?: boolean;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, mono = false, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'resize-vertical flex min-h-[80px] w-full rounded-lg border border-border bg-tertiary px-3 py-2 font-[inherit] text-[13px] text-primary placeholder:text-muted-foreground focus-visible:border-border-strong focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          mono && 'font-mono text-[12px] [tab-size:2]',
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
