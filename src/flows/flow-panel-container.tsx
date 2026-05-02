'use client';

import { forwardRef, type HTMLAttributes, type ReactNode, type SyntheticEvent } from 'react';

export interface FlowPanelContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const FlowPanelContainer = forwardRef<HTMLDivElement, FlowPanelContainerProps>(
  ({ children, className, ...props }, ref) => {
    const stopPropagation = (event: SyntheticEvent) => {
      event.stopPropagation();
    };

    return (
      <div
        ref={ref}
        className={className}
        onMouseDownCapture={stopPropagation}
        onPointerDownCapture={stopPropagation}
        onDoubleClickCapture={stopPropagation}
        {...props}
      >
        {children}
      </div>
    );
  }
);

FlowPanelContainer.displayName = 'FlowPanelContainer';
