import type { VariantProps } from 'class-variance-authority';
import type { toastVariants } from './Toast';

export interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof import('@radix-ui/react-toast').Root>,
    VariantProps<typeof toastVariants> {
  title?: string;
  description?: string;
}

export interface ToastActionProps
  extends React.ComponentPropsWithoutRef<typeof import('@radix-ui/react-toast').Action> {}

export interface ToastCloseProps
  extends React.ComponentPropsWithoutRef<typeof import('@radix-ui/react-toast').Close> {}

export interface ToastViewportProps
  extends React.ComponentPropsWithoutRef<typeof import('@radix-ui/react-toast').Viewport> {}

export interface ToastTitleProps
  extends React.ComponentPropsWithoutRef<typeof import('@radix-ui/react-toast').Title> {}

export interface ToastDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof import('@radix-ui/react-toast').Description> {}
