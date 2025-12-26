import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup, RadioGroupItem } from './RadioGroup';
import { Label } from '../Label/Label';

const meta: Meta<typeof RadioGroup> = {
  title: 'Primitives/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="option1" />
        <Label htmlFor="option1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="option2" />
        <Label htmlFor="option2">Option 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option3" id="option3" />
        <Label htmlFor="option3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="option1" className="flex gap-6">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="h-option1" />
        <Label htmlFor="h-option1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="h-option2" />
        <Label htmlFor="h-option2">Option 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option3" id="h-option3" />
        <Label htmlFor="h-option3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="d-option1" />
        <Label htmlFor="d-option1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="d-option2" disabled />
        <Label htmlFor="d-option2" className="text-muted-foreground">
          Option 2 (Disabled)
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option3" id="d-option3" />
        <Label htmlFor="d-option3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <Label className="text-base font-semibold mb-2 block">
          Payment Method
        </Label>
        <RadioGroup defaultValue="card">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card">Credit Card</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="paypal" id="paypal" />
            <Label htmlFor="paypal">PayPal</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bank" id="bank" />
            <Label htmlFor="bank">Bank Transfer</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  ),
};
