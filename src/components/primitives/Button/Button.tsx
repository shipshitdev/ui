import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/utils/cn';
import { cursorPointer, disabledStyles, focusStyles, transitionAll } from '@/utils/styles';
import type { ButtonProps } from './Button.types';

export const buttonVariants = cva(
  `inline-flex items-center justify-center gap-2 rounded-md font-medium ${transitionAll} ${focusStyles} ${disabledStyles} ${cursorPointer}`,
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70',
        ghost:
          'bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground active:bg-accent/80',
        outline:
          'bg-transparent border border-input text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent active:bg-accent/80',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80',
        link: 'bg-transparent text-primary underline-offset-4 hover:underline hover:text-primary/80',
        'soft-primary': 'bg-primary/10 text-primary hover:bg-primary/20 active:bg-primary/30',
        'soft-secondary':
          'bg-secondary/10 text-secondary-foreground hover:bg-secondary/20 active:bg-secondary/30',
        'soft-success':
          'bg-green-500/10 text-green-600 hover:bg-green-500/20 active:bg-green-500/30 dark:text-green-400',
        'soft-warning':
          'bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 active:bg-yellow-500/30 dark:text-yellow-400',
        'soft-destructive':
          'bg-destructive/10 text-destructive hover:bg-destructive/20 active:bg-destructive/30',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

const Spinner = () => (
  <svg
    className="h-4 w-4 animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const isDisabled = isLoading || disabled;

    const slotProps = asChild
      ? {
          className: cn(
            buttonVariants({ variant, size }),
            isDisabled && 'pointer-events-none opacity-50',
            className
          ),
          ...(isDisabled && { 'aria-disabled': true }),
          ...props,
        }
      : {
          className: cn(buttonVariants({ variant, size }), className),
          disabled: isDisabled,
          ...props,
        };

    return (
      <Comp ref={ref} {...slotProps}>
        {asChild ? (
          children
        ) : isLoading ? (
          <Spinner />
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';
