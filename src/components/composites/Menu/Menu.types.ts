import type { VariantProps } from 'class-variance-authority';
import type { menuVariants } from './Menu';

export interface MenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
}

export interface MenuProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof menuVariants> {
  items: MenuItem[];
}
