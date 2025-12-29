import * as SelectPrimitive from '@radix-ui/react-select';
import { cva } from 'class-variance-authority';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/utils/cn';
import { cursorPointer, disabledCursorStyles } from '@/utils/styles';
import type { SelectProps } from './Select.types';

export const selectVariants = cva(
  `flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus:ring-offset-0 ${cursorPointer} ${disabledCursorStyles} [&>span]:line-clamp-1`,
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

const Select = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectProps & { className?: string }
>(({ className, variant, size, options, placeholder, error, errorMessage, ...props }, ref) => {
  const generatedId = React.useId();
  const errorId = `${generatedId}-error`;

  return (
    <div className="w-full">
      <SelectPrimitive.Root {...props}>
        <SelectPrimitive.Trigger
          ref={ref}
          className={cn(selectVariants({ variant: error ? 'error' : variant, size }), className)}
          aria-invalid={error}
          aria-describedby={error && errorMessage ? errorId : undefined}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon asChild>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={4}
            collisionPadding={8}
            className="z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
          >
            <SelectPrimitive.ScrollUpButton className="flex h-6 cursor-default items-center justify-center bg-popover text-popover-foreground">
              <ChevronUp className="h-4 w-4" />
            </SelectPrimitive.ScrollUpButton>
            <SelectPrimitive.Viewport className="max-h-60 overflow-y-auto">
              {options.map((option, index) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={cn(
                    'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
                    index % 2 === 0 ? 'bg-background' : 'bg-muted/30'
                  )}
                >
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator>
                    <Check className="ml-4 h-5 w-5" />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
            <SelectPrimitive.ScrollDownButton className="flex h-6 cursor-default items-center justify-center bg-popover text-popover-foreground">
              <ChevronDown className="h-4 w-4" />
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {error && errorMessage && (
        <p id={errorId} className="mt-1 text-sm text-destructive">
          {errorMessage}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export { Select };
