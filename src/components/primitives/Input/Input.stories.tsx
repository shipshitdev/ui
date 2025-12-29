import type { Meta, StoryObj } from '@storybook/react-vite';
import { Lock, Mail, Search } from 'lucide-react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    variant: 'default',
    size: 'md',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input" />
      <Input size="lg" placeholder="Large input" />
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Input type="text" placeholder="Text input" />
      <Input type="email" placeholder="Email input" />
      <Input type="password" placeholder="Password input" />
      <Input type="number" placeholder="Number input" />
      <Input type="tel" placeholder="Phone input" />
      <Input type="url" placeholder="URL input" />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Input leftIcon={<Search className="h-4 w-4" />} placeholder="Search..." />
      <Input leftIcon={<Mail className="h-4 w-4" />} placeholder="Email" type="email" />
      <Input rightIcon={<Lock className="h-4 w-4" />} placeholder="Password" type="password" />
      <Input
        leftIcon={<Search className="h-4 w-4" />}
        rightIcon={<Lock className="h-4 w-4" />}
        placeholder="Search with lock"
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Input placeholder="Normal input" />
      <Input placeholder="Disabled input" disabled />
      <Input placeholder="Error input" error errorMessage="This field is required" />
    </div>
  ),
};
