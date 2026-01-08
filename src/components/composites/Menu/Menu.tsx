import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Link } from '@/components/primitives/Link';
import { cn } from '@/utils/cn';
import { cursorPointer, focusStyles, transitionColors } from '@/utils/styles';

export const menuVariants = cva('', {
  variants: {
    orientation: {
      vertical: 'flex flex-col gap-1',
      horizontal: 'flex flex-row gap-1',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
});

export const menuItemVariants = cva(`${transitionColors} ${focusStyles} ${cursorPointer}`, {
  variants: {
    orientation: {
      vertical: 'block px-4 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground',
      horizontal:
        'inline-block px-4 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground',
    },
    active: {
      true: 'bg-accent text-accent-foreground font-medium',
      false: '',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
    active: false,
  },
});

export interface MenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
}

export interface MenuProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof menuVariants> {
  items: MenuItem[];
}

const Menu = React.forwardRef<HTMLElement, MenuProps>(
  ({ className, items, orientation = 'vertical', ...props }, ref) => {
    return (
      <nav ref={ref} className={cn(menuVariants({ orientation }), className)} {...props}>
        {items.map((item, index) => {
          const content = (
            <span
              className={cn(
                menuItemVariants({ orientation, active: item.active }),
                item.disabled && 'pointer-events-none cursor-not-allowed opacity-50',
                !item.active && (index % 2 === 0 ? 'bg-background' : 'bg-muted/30')
              )}
            >
              {item.label}
            </span>
          );

          if (item.href && !item.disabled) {
            return (
              <Link
                // biome-ignore lint/suspicious/noArrayIndexKey: Menu items are static and don't reorder
                key={index}
                href={item.href}
                onClick={item.onClick}
                variant="secondary"
                underline="none"
                className="block w-full"
              >
                {content}
              </Link>
            );
          }

          return (
            <button
              // biome-ignore lint/suspicious/noArrayIndexKey: Menu items are static and don't reorder
              key={index}
              type="button"
              onClick={item.onClick}
              disabled={item.disabled}
              className="block w-full text-left"
            >
              {content}
            </button>
          );
        })}
      </nav>
    );
  }
);
Menu.displayName = 'Menu';

export { Menu };
