import type { Meta, StoryObj } from '@storybook/react-vite';
import { Download, Heart, Search } from 'lucide-react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'ghost',
        'outline',
        'destructive',
        'link',
        'soft-primary',
        'soft-secondary',
        'soft-success',
        'soft-warning',
        'soft-destructive',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon'],
    },
    isLoading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    asChild: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
      <Button variant="soft-primary">Soft Primary</Button>
      <Button variant="soft-secondary">Soft Secondary</Button>
      <Button variant="soft-success">Soft Success</Button>
      <Button variant="soft-warning">Soft Warning</Button>
      <Button variant="soft-destructive">Soft Destructive</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Search className="h-4 w-4" />
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button leftIcon={<Download className="h-4 w-4" />}>Download</Button>
      <Button rightIcon={<Heart className="h-4 w-4" />}>Like</Button>
      <Button leftIcon={<Search className="h-4 w-4" />} rightIcon={<Heart className="h-4 w-4" />}>
        Search & Like
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button isLoading>Loading</Button>
      <Button isLoading variant="secondary">
        Loading
      </Button>
      <Button isLoading variant="outline">
        Loading
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>Disabled</Button>
      <Button disabled variant="secondary">
        Disabled
      </Button>
      <Button disabled variant="outline">
        Disabled
      </Button>
    </div>
  ),
};
