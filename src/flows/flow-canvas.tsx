'use client';

import type { Edge, Node } from '@xyflow/react';
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  type BackgroundProps,
  type ControlProps,
  type MiniMapProps,
  type ReactFlowProps,
} from '@xyflow/react';
import { cn } from '../lib/utils';

export type FlowCanvasProps<
  NodeType extends Node = Node,
  EdgeType extends Edge = Edge,
> = ReactFlowProps<NodeType, EdgeType> & {
  containerClassName?: string;
  showBackground?: boolean;
  showControls?: boolean;
  showMiniMap?: boolean;
  backgroundProps?: Partial<BackgroundProps>;
  controlsProps?: Partial<ControlProps>;
  miniMapProps?: Partial<MiniMapProps<NodeType>>;
};

export function FlowCanvas<NodeType extends Node = Node, EdgeType extends Edge = Edge>({
  containerClassName,
  className,
  children,
  fitView = true,
  proOptions,
  showBackground = true,
  showControls = true,
  showMiniMap = true,
  backgroundProps,
  controlsProps,
  miniMapProps,
  ...props
}: FlowCanvasProps<NodeType, EdgeType>) {
  const { className: miniMapClassName, ...resolvedMiniMapProps } = miniMapProps ?? {};

  return (
    <div
      className={cn(
        'ssd-flow-canvas h-[560px] w-full overflow-hidden rounded-xl border border-border bg-secondary shadow-[0_24px_60px_-35px_rgba(0,0,0,0.75)]',
        containerClassName
      )}
    >
      <ReactFlow<NodeType, EdgeType>
        fitView={fitView}
        proOptions={{ hideAttribution: true, ...proOptions }}
        className={cn('bg-transparent text-primary', className)}
        {...props}
      >
        {children}
        {showBackground ? (
          <Background
            gap={20}
            size={1}
            variant={BackgroundVariant.Dots}
            color="var(--border)"
            {...backgroundProps}
          />
        ) : null}
        {showControls ? <Controls position="bottom-right" {...controlsProps} /> : null}
        {showMiniMap ? (
          <MiniMap
            pannable
            zoomable
            className={cn('hidden md:block', miniMapClassName)}
            {...resolvedMiniMapProps}
          />
        ) : null}
      </ReactFlow>
    </div>
  );
}
