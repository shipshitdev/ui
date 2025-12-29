import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/utils/cn';
import { focusStyles, transitionColors } from '@/utils/styles';

export const linkVariants = cva(`${transitionColors} ${focusStyles}`, {
  variants: {
    variant: {
      default: 'text-foreground hover:text-primary dark:text-foreground dark:hover:text-primary',
      primary: 'text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/80',
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
});

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  asChild?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant = 'default', underline = 'hover', asChild, ...props }, ref) => {
    const Comp = asChild ? 'span' : 'a';
    return (
      <Comp ref={ref} className={cn(linkVariants({ variant, underline }), className)} {...props} />
    );
  }
);
Link.displayName = 'Link';

export { Link };
