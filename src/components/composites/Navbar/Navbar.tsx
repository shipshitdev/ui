import { cva, type VariantProps } from 'class-variance-authority';
import { Menu as MenuIcon, X } from 'lucide-react';
import * as React from 'react';
import { Menu } from '@/components/composites/Menu';
import { Button } from '@/components/primitives/Button';
import { cn } from '@/utils/cn';
import type { MenuItem } from '../Menu';

export const navbarVariants = cva('relative w-full flex items-center justify-between px-4 py-3', {
  variants: {
    variant: {
      default: 'bg-background',
      bordered: 'bg-background border-b border-border',
      elevated: 'bg-background shadow-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface NavbarProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navbarVariants> {
  brand?: React.ReactNode;
  items?: MenuItem[];
  actions?: React.ReactNode;
  mobileMenuOpen?: boolean;
  onMobileMenuToggle?: (open: boolean) => void;
}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  (
    {
      className,
      variant = 'default',
      brand,
      items = [],
      actions,
      mobileMenuOpen = false,
      onMobileMenuToggle,
      ...props
    },
    ref
  ) => {
    const [isMobileOpen, setIsMobileOpen] = React.useState(mobileMenuOpen);

    const handleToggle = () => {
      const newState = !isMobileOpen;
      setIsMobileOpen(newState);
      onMobileMenuToggle?.(newState);
    };

    return (
      <header ref={ref} className={cn(navbarVariants({ variant }), className)} {...props}>
        <div className="flex items-center gap-4">
          {brand && <div className="flex-shrink-0">{brand}</div>}
          {items.length > 0 && (
            <>
              {/* Desktop Menu */}
              <nav className="hidden md:flex">
                <Menu orientation="horizontal" items={items} />
              </nav>
              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={handleToggle}
                aria-label="Toggle menu"
              >
                {isMobileOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
              </Button>
            </>
          )}
        </div>

        {actions && <div className="flex items-center gap-2">{actions}</div>}

        {/* Mobile Menu */}
        {items.length > 0 && isMobileOpen && (
          <div className="absolute top-full left-0 right-0 md:hidden bg-background border-b border-border shadow-lg z-50">
            <nav className="p-4">
              <Menu orientation="vertical" items={items} />
            </nav>
          </div>
        )}
      </header>
    );
  }
);
Navbar.displayName = 'Navbar';

export { Navbar };
