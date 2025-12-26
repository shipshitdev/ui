import { cn } from '@/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

export const linkVariants = cva(
  'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'text-foreground hover:text-primary dark:text-foreground dark:hover:text-primary',
        primary:
          'text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/80',
        secondary:
          'text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground',
        muted:
          'text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground',
      },
      underline: {
        none: 'no-underline',
        hover: 'no-underline hover:underline',
        always: 'underline',
      },
    },
    defaultVariants: {
      variant: 'default',
      underline: 'hover',
    },
  }
);

export interface LinkProps
  extends
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  asChild?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    { className, variant = 'default', underline = 'hover', asChild, ...props },
    ref
  ) => {
    const Comp = asChild ? 'span' : 'a';
    return (
      <Comp
        ref={ref}
        className={cn(linkVariants({ variant, underline }), className)}
        {...props}
      />
    );
  }
);
Link.displayName = 'Link';

export { Link };
