import type { VariantProps } from 'class-variance-authority';
import type { labelVariants } from './Label';

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {}
