import type * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

export interface DropdownMenuProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root> {}

export interface DropdownMenuTriggerProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger> {}

export interface DropdownMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
  inset?: boolean;
}
