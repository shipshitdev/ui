'use client';

import type * as React from 'react';
import { cn } from '../lib/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'output'>) {
  return (
    <output
      aria-busy="true"
      className={cn('animate-pulse rounded-md bg-hover/70', className)}
      {...props}
    />
  );
}

export { Skeleton };
