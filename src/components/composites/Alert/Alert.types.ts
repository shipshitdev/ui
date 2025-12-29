import type { VariantProps } from 'class-variance-authority';
import type { alertVariants } from './Alert';

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

export interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
