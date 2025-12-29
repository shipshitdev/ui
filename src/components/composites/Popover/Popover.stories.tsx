import type { Meta, StoryObj } from '@storybook/react-vite';
import { Calendar } from 'lucide-react';
import { Button } from '../../primitives/Button/Button';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

const meta: Meta<typeof Popover> = {
  title: 'Composites/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Dimensions</h4>
          <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Pick a date
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Date Picker</h4>
            <p className="text-sm text-muted-foreground">Select a date from the calendar.</p>
          </div>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <label htmlFor="width" className="text-sm font-medium">
                Width
              </label>
              <input
                id="width"
                className="h-8 rounded-md border border-input bg-background px-3 py-1 text-sm"
                defaultValue="100%"
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="height" className="text-sm font-medium">
                Height
              </label>
              <input
                id="height"
                className="h-8 rounded-md border border-input bg-background px-3 py-1 text-sm"
                defaultValue="25px"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithList: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">View Options</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium">Options</h4>
          <ul className="space-y-1 text-sm">
            <li className="cursor-pointer hover:bg-accent p-2 rounded">Option 1</li>
            <li className="cursor-pointer hover:bg-accent p-2 rounded">Option 2</li>
            <li className="cursor-pointer hover:bg-accent p-2 rounded">Option 3</li>
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
