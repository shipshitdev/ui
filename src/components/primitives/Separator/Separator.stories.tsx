import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from './Separator';

const meta: Meta<typeof Separator> = {
  title: 'Primitives/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    decorative: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  args: {
    orientation: 'horizontal',
  },
};

export const Horizontal: Story = {
  render: () => (
    <div className="w-64">
      <div className="p-4">Content above</div>
      <Separator />
      <div className="p-4">Content below</div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center h-20">
      <div className="px-4">Left</div>
      <Separator orientation="vertical" />
      <div className="px-4">Right</div>
    </div>
  ),
};

export const InList: Story = {
  render: () => (
    <div className="w-64 border rounded-lg p-4 space-y-2">
      <div className="p-2">Item 1</div>
      <Separator />
      <div className="p-2">Item 2</div>
      <Separator />
      <div className="p-2">Item 3</div>
      <Separator />
      <div className="p-2">Item 4</div>
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div className="w-64">
      <div className="flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-sm text-muted-foreground">OR</span>
        <Separator className="flex-1" />
      </div>
    </div>
  ),
};

