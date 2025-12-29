import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Primitives/Checkbox',
  component: Checkbox,
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
    disabled: {
      control: 'boolean',
    },
    checked: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
    variant: 'default',
    size: 'md',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox size="sm" label="Small checkbox" />
      <Checkbox size="md" label="Medium checkbox" />
      <Checkbox size="lg" label="Large checkbox" />
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox
        label="Enable notifications"
        description="Receive updates about your account activity"
      />
      <Checkbox label="Marketing emails" description="Get emails about new products and features" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" checked />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled checked" checked disabled />
      <Checkbox label="Error state" error />
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold">Select your preferences</h3>
      <Checkbox label="Email notifications" />
      <Checkbox label="SMS notifications" />
      <Checkbox label="Push notifications" />
      <Checkbox label="Marketing emails" />
    </div>
  ),
};
