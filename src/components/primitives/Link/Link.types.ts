import type { VariantProps } from 'class-variance-authority';
import type { linkVariants } from './Link';

export interface LinkProps
  extends
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  asChild?: boolean;
}
