import type { Meta, StoryObj } from '@storybook/react-vite';
import { Loading } from './Loading';

const meta: Meta<typeof Loading> = {
  title: 'Primitives/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['spinner', 'dots', 'bars', 'pulse'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Loading>;

export const Spinner: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-8">
      <Loading variant="spinner" size="sm" />
      <Loading variant="spinner" size="md" />
      <Loading variant="spinner" size="lg" />
    </div>
  ),
};

export const Dots: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-8">
      <Loading variant="dots" size="sm" />
      <Loading variant="dots" size="md" />
      <Loading variant="dots" size="lg" />
    </div>
  ),
};

export const Bars: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-8">
      <Loading variant="bars" size="sm" />
      <Loading variant="bars" size="md" />
      <Loading variant="bars" size="lg" />
    </div>
  ),
};

export const Pulse: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-8">
      <Loading variant="pulse" size="sm" />
      <Loading variant="pulse" size="md" />
      <Loading variant="pulse" size="lg" />
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <Loading variant="spinner" text="Loading..." />
      <Loading variant="dots" text="Please wait" />
      <Loading variant="bars" text="Processing" />
      <Loading variant="pulse" text="Almost done" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col gap-4">
        <h3 className="font-medium text-muted-foreground text-sm">Spinner</h3>
        <div className="flex items-center gap-8">
          <Loading variant="spinner" size="sm" />
          <Loading variant="spinner" size="md" />
          <Loading variant="spinner" size="lg" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="font-medium text-muted-foreground text-sm">Dots</h3>
        <div className="flex items-center gap-8">
          <Loading variant="dots" size="sm" />
          <Loading variant="dots" size="md" />
          <Loading variant="dots" size="lg" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="font-medium text-muted-foreground text-sm">Bars</h3>
        <div className="flex items-center gap-8">
          <Loading variant="bars" size="sm" />
          <Loading variant="bars" size="md" />
          <Loading variant="bars" size="lg" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="font-medium text-muted-foreground text-sm">Pulse</h3>
        <div className="flex items-center gap-8">
          <Loading variant="pulse" size="sm" />
          <Loading variant="pulse" size="md" />
          <Loading variant="pulse" size="lg" />
        </div>
      </div>
    </div>
  ),
};
