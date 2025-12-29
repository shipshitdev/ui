import * as React from 'react';
import { cn } from '@/utils/cn';
import { disabledCursorStyles, inputFocusStyles, transitionColors } from '@/utils/styles';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          `flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground ${transitionColors} ${inputFocusStyles} ${disabledCursorStyles}`,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
