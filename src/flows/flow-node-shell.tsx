'use client';

import { NodeResizer } from '@xyflow/react';
import type { ComponentProps, ReactNode } from 'react';
import { Badge } from '../primitives/badge';
import { cn } from '../lib/utils';

export type FlowNodeTone = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'accent';
export type FlowNodeShellStatus = 'idle' | 'running' | 'success' | 'warning' | 'error';

export type FlowNodeShellProps = Omit<ComponentProps<'div'>, 'title'> & {
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  headerActions?: ReactNode;
  footer?: ReactNode;
  tone?: FlowNodeTone;
  status?: FlowNodeShellStatus;
  statusLabel?: ReactNode;
  selected?: boolean;
  dimmed?: boolean;
  resizable?: boolean;
  minWidth?: number;
  minHeight?: number;
};

const toneClassName: Record<FlowNodeTone, string> = {
  default: 'border-border',
  success: 'border-success/25',
  warning: 'border-warning/25',
  danger: 'border-danger/25',
  info: 'border-info/25',
  accent: 'border-border-strong',
};

const statusVariant = {
  idle: null,
  running: 'info',
  success: 'success',
  warning: 'warning',
  error: 'danger',
} as const;

const statusLabel = {
  idle: '',
  running: 'Running',
  success: 'Success',
  warning: 'Warning',
  error: 'Error',
} as const;

export function FlowNodeShell({
  title,
  description,
  meta,
  headerActions,
  footer,
  tone = 'default',
  status = 'idle',
  statusLabel: customStatusLabel,
  selected = false,
  dimmed = false,
  resizable = false,
  minWidth = 220,
  minHeight = 120,
  className,
  children,
  ...props
}: FlowNodeShellProps) {
  return (
    <div
      data-selected={selected}
      className={cn(
        'ssd-flow-node relative min-w-[220px] rounded-xl border bg-secondary text-primary shadow-[0_20px_45px_-28px_rgba(0,0,0,0.75)] transition-[border-color,box-shadow,opacity] duration-200',
        toneClassName[tone],
        selected && 'shadow-[0_24px_55px_-26px_rgba(0,0,0,0.85)] ring-1 ring-accent/25',
        dimmed && 'opacity-60',
        className
      )}
      {...props}
    >
      {resizable ? (
        <NodeResizer
          isVisible={selected}
          minWidth={minWidth}
          minHeight={minHeight}
          lineClassName="border-info/35"
          handleClassName="rounded-full border border-border bg-elevated"
        />
      ) : null}

      <div className="flex items-start justify-between gap-3 border-border/80 border-b px-4 py-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="truncate font-medium text-[13px] leading-none">{title}</div>
            {statusVariant[status] ? (
              <Badge variant={statusVariant[status]}>
                {customStatusLabel ?? statusLabel[status]}
              </Badge>
            ) : null}
          </div>
          {description ? (
            <p className="mt-1 text-muted-foreground text-xs leading-relaxed">{description}</p>
          ) : null}
        </div>

        {headerActions ? <div className="flex items-center gap-1.5">{headerActions}</div> : null}
      </div>

      {meta ? (
        <div className="flex flex-wrap gap-1.5 border-border/70 border-b px-4 py-2 text-secondary text-xs">
          {meta}
        </div>
      ) : null}

      <div className="px-4 py-3">{children}</div>

      {footer ? <div className="border-border/80 border-t px-4 py-3">{footer}</div> : null}
    </div>
  );
}
