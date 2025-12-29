import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Primitives/Select',
  component: Select,
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
    error: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
];

export const Default: Story = {
  args: {
    options,
    placeholder: 'Select an option...',
    variant: 'default',
    size: 'md',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Select size="sm" options={options} placeholder="Small select" />
      <Select size="md" options={options} placeholder="Medium select" />
      <Select size="lg" options={options} placeholder="Large select" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Select options={options} placeholder="Normal select" />
      <Select options={options} placeholder="Disabled select" disabled />
      <Select
        options={options}
        placeholder="Error select"
        error
        errorMessage="Please select an option"
      />
    </div>
  ),
};

export const WithDefaultValue: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Select options={options} placeholder="Select an option..." defaultValue="option2" />
    </div>
  ),
};

export const ManyOptions: Story = {
  render: () => {
    const manyOptions = Array.from({ length: 20 }, (_, i) => ({
      value: `option${i + 1}`,
      label: `Option ${i + 1}`,
    }));
    return (
      <div className="w-64">
        <Select options={manyOptions} placeholder="Select from many options..." />
      </div>
    );
  },
};
