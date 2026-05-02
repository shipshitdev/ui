'use client';

import * as React from 'react';
import { cn } from '../lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          'flex h-8 w-full rounded-lg border border-border bg-tertiary px-3 py-1.5 text-[13px] text-primary transition-colors file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted focus-visible:border-border-strong focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
