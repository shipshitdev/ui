import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from '../Label/Label';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Primitives/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    rows: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-4">
      <Textarea placeholder="Small textarea" className="min-h-[60px]" />
      <Textarea placeholder="Medium textarea" className="min-h-[100px]" />
      <Textarea placeholder="Large textarea" className="min-h-[150px]" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-2">
      <Label htmlFor="message">Message</Label>
      <Textarea id="message" placeholder="Enter your message..." />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-4">
      <Textarea placeholder="Normal textarea" />
      <Textarea placeholder="Disabled textarea" disabled />
      <Textarea
        placeholder="With value"
        defaultValue="This is a pre-filled textarea with some content."
      />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="feedback">Feedback</Label>
        <Textarea
          id="feedback"
          placeholder="Please share your feedback..."
          className="min-h-[120px]"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea id="notes" placeholder="Any additional information..." className="min-h-[80px]" />
      </div>
    </div>
  ),
};
