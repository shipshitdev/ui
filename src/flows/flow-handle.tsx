'use client';

import type { HandleProps } from '@xyflow/react';
import { Handle } from '@xyflow/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const flowHandleVariants = cva('flow-handle border border-background shadow-sm', {
  variants: {
    tone: {
      default: 'flow-handle-default',
      image: 'flow-handle-image',
      video: 'flow-handle-video',
      text: 'flow-handle-text',
      number: 'flow-handle-number',
      audio: 'flow-handle-audio',
      success: 'flow-handle-success',
      warning: 'flow-handle-warning',
      danger: 'flow-handle-danger',
      info: 'flow-handle-info',
      accent: 'flow-handle-accent',
    },
    size: {
      sm: 'h-2.5 w-2.5',
      default: 'h-3 w-3',
      lg: 'h-3.5 w-3.5',
    },
  },
  defaultVariants: {
    tone: 'default',
    size: 'default',
  },
});

export type FlowHandleTone = NonNullable<VariantProps<typeof flowHandleVariants>['tone']>;

export type FlowHandleProps = HandleProps & VariantProps<typeof flowHandleVariants>;

export function FlowHandle({ className, tone, size, ...props }: FlowHandleProps) {
  return <Handle className={cn(flowHandleVariants({ tone, size }), className)} {...props} />;
}

export { flowHandleVariants };
