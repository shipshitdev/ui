import { cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/utils/cn';
import { focusOutlineStyles, transitionColors } from '@/utils/styles';
import type { BadgeProps } from './Badge.types';

export const badgeVariants = cva(
  `inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${transitionColors} ${focusOutlineStyles}`,
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        success: 'border-transparent bg-green-500 text-white hover:bg-green-600',
        warning: 'border-transparent bg-yellow-500 text-white hover:bg-yellow-600',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <span ref={ref} className={cn(badgeVariants({ variant, size }), className)} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
