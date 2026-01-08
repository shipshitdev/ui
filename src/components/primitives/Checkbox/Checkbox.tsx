import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cva } from 'class-variance-authority';
import { Check } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/utils/cn';
import { disabledCursorStyles, focusStyles } from '@/utils/styles';
import type { CheckboxProps } from './Checkbox.types';

export const checkboxVariants = cva(
  `peer h-4 w-4 shrink-0 rounded-sm border border-primary ${focusStyles} ${disabledCursorStyles} data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground`,
  {
    variants: {
      variant: {
        default: '',
        error: 'border-destructive',
      },
      size: {
        sm: 'h-4 w-4',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, variant, size, label, description, error, id, ...props }, ref) => {
  const generatedId = React.useId();
  const checkboxId = id || generatedId;
  const descriptionId = `${checkboxId}-description`;

  return (
    <div className="flex items-start gap-3">
      <CheckboxPrimitive.Root
        ref={ref}
        id={checkboxId}
        className={cn(checkboxVariants({ variant: error ? 'error' : variant, size }), className)}
        aria-describedby={description ? descriptionId : undefined}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          className={cn('flex items-center justify-center text-current')}
        >
          <Check className="h-4 w-4" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <label
              htmlFor={checkboxId}
              className="cursor-pointer font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
          )}
          {description && (
            <span id={descriptionId} className="text-muted-foreground text-sm">
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';
