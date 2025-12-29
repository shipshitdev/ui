import type * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import type { VariantProps } from 'class-variance-authority';
import type { checkboxVariants } from './Checkbox';

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {
  label?: string;
  description?: string;
  error?: boolean;
}
