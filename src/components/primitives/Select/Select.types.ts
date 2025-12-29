import type * as SelectPrimitive from '@radix-ui/react-select';
import type { VariantProps } from 'class-variance-authority';
import type { selectVariants } from './Select';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>,
    VariantProps<typeof selectVariants> {
  options: SelectOption[];
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
}
