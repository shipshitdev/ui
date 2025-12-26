import { cn } from '@/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

export const loadingVariants = cva('', {
  variants: {
    variant: {
      spinner:
        'animate-spin rounded-full border-2 border-current border-t-transparent',
      dots: 'flex gap-1',
      bars: 'flex gap-1',
      pulse: 'animate-pulse rounded-full bg-current',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  compoundVariants: [
    // Spinner sizes
    {
      variant: 'spinner',
      size: 'sm',
      class: 'h-4 w-4',
    },
    {
      variant: 'spinner',
      size: 'md',
      class: 'h-6 w-6',
    },
    {
      variant: 'spinner',
      size: 'lg',
      class: 'h-8 w-8',
    },
    // Dots sizes
    {
      variant: 'dots',
      size: 'sm',
      class: '[&>span]:h-1.5 [&>span]:w-1.5',
    },
    {
      variant: 'dots',
      size: 'md',
      class: '[&>span]:h-2 [&>span]:w-2',
    },
    {
      variant: 'dots',
      size: 'lg',
      class: '[&>span]:h-2.5 [&>span]:w-2.5',
    },
    // Bars sizes
    {
      variant: 'bars',
      size: 'sm',
      class: '[&>span]:h-3 [&>span]:w-0.5',
    },
    {
      variant: 'bars',
      size: 'md',
      class: '[&>span]:h-4 [&>span]:w-1',
    },
    {
      variant: 'bars',
      size: 'lg',
      class: '[&>span]:h-6 [&>span]:w-1.5',
    },
    // Pulse sizes
    {
      variant: 'pulse',
      size: 'sm',
      class: 'h-4 w-4',
    },
    {
      variant: 'pulse',
      size: 'md',
      class: 'h-6 w-6',
    },
    {
      variant: 'pulse',
      size: 'lg',
      class: 'h-8 w-8',
    },
  ],
  defaultVariants: {
    variant: 'spinner',
    size: 'md',
  },
});

export interface LoadingProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingVariants> {
  text?: string;
}

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({ className, variant = 'spinner', size = 'md', text, ...props }, ref) => {
    if (variant === 'dots') {
      return (
        <div
          ref={ref}
          className={cn('flex items-center gap-2', className)}
          {...props}
        >
          <div
            className={cn(loadingVariants({ variant, size }), 'text-primary')}
          >
            <span className="inline-block rounded-full bg-current animate-[bounce_1.4s_ease-in-out_infinite]" />
            <span className="inline-block rounded-full bg-current animate-[bounce_1.4s_ease-in-out_0.2s_infinite]" />
            <span className="inline-block rounded-full bg-current animate-[bounce_1.4s_ease-in-out_0.4s_infinite]" />
          </div>
          {text && <span className="text-sm text-foreground">{text}</span>}
        </div>
      );
    }

    if (variant === 'bars') {
      return (
        <div
          ref={ref}
          className={cn('flex items-center gap-2', className)}
          {...props}
        >
          <div
            className={cn(loadingVariants({ variant, size }), 'text-primary')}
          >
            <span className="inline-block rounded-sm bg-current animate-[pulse_1.2s_ease-in-out_0s_infinite]" />
            <span className="inline-block rounded-sm bg-current animate-[pulse_1.2s_ease-in-out_0.2s_infinite]" />
            <span className="inline-block rounded-sm bg-current animate-[pulse_1.2s_ease-in-out_0.4s_infinite]" />
          </div>
          {text && <span className="text-sm text-foreground">{text}</span>}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-2', className)}
        {...props}
      >
        <div
          className={cn(loadingVariants({ variant, size }), 'text-primary')}
        />
        {text && <span className="text-sm text-foreground">{text}</span>}
      </div>
    );
  }
);
Loading.displayName = 'Loading';

export { Loading };
