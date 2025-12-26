import type { VariantProps } from 'class-variance-authority';
import type { loadingVariants } from './Loading';

export interface LoadingProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingVariants> {
  text?: string;
}
