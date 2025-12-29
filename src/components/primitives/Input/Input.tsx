import { cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/utils/cn';
import { disabledCursorStyles, inputFocusStyles, transitionColors } from '@/utils/styles';
import type { InputProps } from './Input.types';

export const inputVariants = cva(
  `flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground ${transitionColors} ${inputFocusStyles} ${disabledCursorStyles}`,
  {
    variants: {
      variant: {
        default: '',
        error: 'border-destructive',
      },
      size: {
        sm: 'h-8 px-2 text-xs',
        md: 'h-10 px-3 text-sm',
        lg: 'h-12 px-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      leftIcon,
      rightIcon,
      error,
      errorMessage,
      type = 'text',
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const hasLeftIcon = !!leftIcon;
    const hasRightIcon = !!rightIcon;

    return (
      <div className="relative w-full">
        {hasLeftIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={cn(
            inputVariants({ variant: error ? 'error' : variant, size }),
            hasLeftIcon && 'pl-10',
            hasRightIcon && 'pr-10',
            className
          )}
          aria-invalid={error}
          aria-describedby={error && errorMessage ? errorId : undefined}
          {...props}
        />
        {hasRightIcon && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground">
            {rightIcon}
          </div>
        )}
        {error && errorMessage && (
          <p id={errorId} className="mt-1 text-sm text-destructive">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
