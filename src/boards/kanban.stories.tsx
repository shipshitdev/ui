import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../primitives/badge';
import { KanbanBoard, KanbanCard } from './kanban';

type Task = {
  id: string;
  title: string;
  description: string;
  tags: string[];
};

const columns = [
  {
    id: 'todo',
    title: 'Todo',
    tone: 'success' as const,
    description: 'Ready to pick up.',
    items: [
      {
        id: 'task-1',
        title: 'Shape onboarding',
        description: 'Define the first-run flow and project scope questions.',
        tags: ['product', 'ux'],
      },
    ],
    renderItem: (task: Task) => (
      <KanbanCard
        title={task.title}
        description={task.description}
        meta={task.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
      />
    ),
  },
  {
    id: 'active',
    title: 'Active',
    tone: 'info' as const,
    description: 'Being worked on now.',
    items: [
      {
        id: 'task-2',
        title: 'Build shared kanban',
        description: 'Keep workflow UI generic and product-agnostic.',
        tags: ['workflow', 'ui'],
      },
    ],
    renderItem: (task: Task) => (
      <KanbanCard
        title={task.title}
        description={task.description}
        meta={task.tags.map((tag) => (
          <Badge key={tag} variant="info">
            {tag}
          </Badge>
        ))}
      />
    ),
  },
  {
    id: 'done',
    title: 'Done',
    tone: 'accent' as const,
    description: 'Completed work.',
    items: [],
    renderItem: (task: Task) => <KanbanCard title={task.title} />,
  },
];

const meta: Meta<typeof KanbanBoard<Task>> = {
  title: 'Boards/KanbanBoard',
  component: KanbanBoard<Task>,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof KanbanBoard<Task>>;

export const Default: Story = {
  args: {
    columns,
    getItemId: (task) => task.id,
  },
  render: (args) => (
    <main className="min-h-screen bg-primary p-8">
      <KanbanBoard {...args} />
    </main>
  ),
};
