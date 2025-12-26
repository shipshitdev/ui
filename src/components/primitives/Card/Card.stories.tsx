import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { Card, CardContent, CardFooter, CardHeader } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Primitives/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outline'],
    },
    hover: {
      control: 'boolean',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <h3 className="text-lg font-semibold">Card Title</h3>
        <p className="text-sm text-muted-foreground">Card description</p>
      </CardHeader>
      <CardContent>
        <p>This is the card content area. You can put any content here.</p>
      </CardContent>
      <CardFooter>
        <Button variant="primary">Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card variant="default" className="w-96">
        <CardHeader>
          <h3 className="text-lg font-semibold">Default Card</h3>
        </CardHeader>
        <CardContent>
          <p>Default variant with standard shadow.</p>
        </CardContent>
      </Card>
      <Card variant="elevated" className="w-96">
        <CardHeader>
          <h3 className="text-lg font-semibold">Elevated Card</h3>
        </CardHeader>
        <CardContent>
          <p>Elevated variant with more shadow.</p>
        </CardContent>
      </Card>
      <Card variant="outline" className="w-96">
        <CardHeader>
          <h3 className="text-lg font-semibold">Outline Card</h3>
        </CardHeader>
        <CardContent>
          <p>Outline variant with border emphasis.</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const WithHover: Story = {
  render: () => (
    <Card hover className="w-96">
      <CardHeader>
        <h3 className="text-lg font-semibold">Hoverable Card</h3>
      </CardHeader>
      <CardContent>
        <p>
          This card has hover effects. Hover over it to see the shadow change.
        </p>
      </CardContent>
    </Card>
  ),
};

export const PaddingVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card padding="none" className="w-96">
        <CardHeader>
          <h3 className="text-lg font-semibold">No Padding</h3>
        </CardHeader>
        <CardContent>
          <p>Card with no default padding.</p>
        </CardContent>
      </Card>
      <Card padding="sm" className="w-96">
        <h3 className="text-lg font-semibold mb-2">Small Padding</h3>
        <p>Card with small padding.</p>
      </Card>
      <Card padding="md" className="w-96">
        <h3 className="text-lg font-semibold mb-2">Medium Padding</h3>
        <p>Card with medium padding.</p>
      </Card>
      <Card padding="lg" className="w-96">
        <h3 className="text-lg font-semibold mb-2">Large Padding</h3>
        <p>Card with large padding.</p>
      </Card>
    </div>
  ),
};

export const Complex: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <h3 className="text-lg font-semibold">Product Card</h3>
        <p className="text-sm text-muted-foreground">Premium subscription</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-2xl font-bold">$29.99</p>
          <p className="text-sm text-muted-foreground">per month</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Learn More</Button>
        <Button variant="primary">Subscribe</Button>
      </CardFooter>
    </Card>
  ),
};
