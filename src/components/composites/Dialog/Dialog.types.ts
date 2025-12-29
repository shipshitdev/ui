import type * as DialogPrimitive from '@radix-ui/react-dialog';

export interface DialogProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root> {}

export interface DialogTriggerProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger> {}

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {}

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface DialogTitleProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {}

export interface DialogDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {}
