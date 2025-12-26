import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Primitives/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    max: {
      control: { type: 'number' },
    },
    step: {
      control: { type: 'number' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
  },
  render: (args) => (
    <div className="w-64">
      <Slider {...args} />
    </div>
  ),
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = React.useState([50]);
    return (
      <div className="w-64 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Value</span>
          <span>{value[0]}</span>
        </div>
        <Slider value={value} onValueChange={setValue} max={100} step={1} />
      </div>
    );
  },
};

export const Range: Story = {
  render: () => {
    const [value, setValue] = React.useState([20, 80]);
    return (
      <div className="w-64 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Range</span>
          <span>
            {value[0]} - {value[1]}
          </span>
        </div>
        <Slider value={value} onValueChange={setValue} max={100} step={1} />
      </div>
    );
  },
};

export const Steps: Story = {
  render: () => (
    <div className="w-64 space-y-4">
      <div className="space-y-2">
        <div className="text-sm">Step: 1</div>
        <Slider defaultValue={[50]} max={100} step={1} />
      </div>
      <div className="space-y-2">
        <div className="text-sm">Step: 10</div>
        <Slider defaultValue={[50]} max={100} step={10} />
      </div>
      <div className="space-y-2">
        <div className="text-sm">Step: 25</div>
        <Slider defaultValue={[50]} max={100} step={25} />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-64">
      <Slider defaultValue={[50]} max={100} disabled />
    </div>
  ),
};

