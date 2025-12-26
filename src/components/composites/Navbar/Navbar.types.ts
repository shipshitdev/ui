import type { VariantProps } from 'class-variance-authority';
import type { navbarVariants } from './Navbar';
import type { MenuItem } from '../Menu';

export interface NavbarProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navbarVariants> {
  brand?: React.ReactNode;
  items?: MenuItem[];
  actions?: React.ReactNode;
  mobileMenuOpen?: boolean;
  onMobileMenuToggle?: (open: boolean) => void;
}
