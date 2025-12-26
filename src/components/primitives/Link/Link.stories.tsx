import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from './Link';

const meta: Meta<typeof Link> = {
  title: 'Primitives/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'muted'],
    },
    underline: {
      control: 'select',
      options: ['none', 'hover', 'always'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Link href="#">Default link with hover underline</Link>
      <Link href="#" variant="primary">
        Primary link
      </Link>
      <Link href="#" variant="secondary">
        Secondary link
      </Link>
      <Link href="#" variant="muted">
        Muted link
      </Link>
    </div>
  ),
};

export const UnderlineStyles: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Link href="#" underline="none">
        No underline
      </Link>
      <Link href="#" underline="hover">
        Underline on hover (default)
      </Link>
      <Link href="#" underline="always">
        Always underlined
      </Link>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium text-muted-foreground">Default</h3>
        <Link href="#">Default link</Link>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium text-muted-foreground">Primary</h3>
        <Link href="#" variant="primary">
          Primary link
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium text-muted-foreground">Secondary</h3>
        <Link href="#" variant="secondary">
          Secondary link
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium text-muted-foreground">Muted</h3>
        <Link href="#" variant="muted">
          Muted link
        </Link>
      </div>
    </div>
  ),
};

export const InParagraph: Story = {
  render: () => (
    <div className="max-w-md">
      <p className="text-sm text-foreground">
        This is a paragraph with a{' '}
        <Link href="#" variant="primary">
          link inside
        </Link>{' '}
        the text. You can also have a{' '}
        <Link href="#" variant="secondary" underline="always">
          different styled link
        </Link>{' '}
        in the same paragraph.
      </p>
    </div>
  ),
};
