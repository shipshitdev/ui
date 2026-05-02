import '@xyflow/react/dist/style.css';
import '../styles/flows.css';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { Node, NodeProps } from '@xyflow/react';
import { Badge } from '../primitives/badge';
import { FlowCanvas } from './flow-canvas';
import { FlowHandle } from './flow-handle';
import { FlowNodeShell } from './flow-node-shell';
import { Position } from './index';

type FlowStoryNodeData = {
  title: string;
  description: string;
  tone?: 'default' | 'info' | 'accent';
  status?: 'idle' | 'running' | 'success';
};

type FlowStoryNode = Node<FlowStoryNodeData, 'shell'>;

function FlowStoryNodeComponent({ data, selected }: NodeProps<FlowStoryNode>) {
  return (
    <>
      <FlowHandle id="in" type="target" position={Position.Left} tone="text" />
      <FlowNodeShell
        title={data.title}
        description={data.description}
        tone={data.tone ?? 'default'}
        status={data.status ?? 'idle'}
        selected={selected}
        meta={<Badge variant="info">Shared primitive</Badge>}
      >
        <div className="text-secondary text-xs leading-relaxed">
          Compose product-specific nodes on top of the shared shell.
        </div>
      </FlowNodeShell>
      <FlowHandle id="out" type="source" position={Position.Right} tone="accent" />
    </>
  );
}

const nodes: FlowStoryNode[] = [
  {
    id: 'brief',
    type: 'shell',
    position: { x: 80, y: 180 },
    data: {
      title: 'Brief',
      description: 'Collect project scope and route defaults.',
      tone: 'info',
      status: 'success',
    } satisfies FlowStoryNodeData,
  },
  {
    id: 'agent',
    type: 'shell',
    position: { x: 420, y: 180 },
    data: {
      title: 'Scaffold Agent',
      description: 'Run Codex or Claude with the scoped prompt.',
      tone: 'accent',
      status: 'running',
    } satisfies FlowStoryNodeData,
  },
];

const edges = [
  {
    id: 'brief-agent',
    source: 'brief',
    target: 'agent',
    sourceHandle: 'out',
    targetHandle: 'in',
    animated: true,
  },
];

const meta: Meta<typeof FlowCanvas> = {
  title: 'Flows/FlowCanvas',
  component: FlowCanvas,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof FlowCanvas>;

export const Default: Story = {
  render: () => (
    <main className="min-h-screen bg-primary p-8">
      <FlowCanvas
        containerClassName="mx-auto max-w-6xl"
        defaultNodes={nodes}
        defaultEdges={edges}
        nodeTypes={{ shell: FlowStoryNodeComponent }}
      />
    </main>
  ),
};
