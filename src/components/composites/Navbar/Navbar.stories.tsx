import { Button } from '@/components/primitives/Button';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Navbar } from './Navbar';

const meta: Meta<typeof Navbar> = {
  title: 'Composites/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'elevated'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

const menuItems = [
  { label: 'Home', href: '/', active: true },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Contact', href: '/contact' },
];

export const Default: Story = {
  render: () => (
    <Navbar
      brand={<span className="text-lg font-bold">Brand</span>}
      items={menuItems}
      actions={<Button size="sm">Sign In</Button>}
    />
  ),
};

export const Bordered: Story = {
  render: () => (
    <Navbar
      variant="bordered"
      brand={<span className="text-lg font-bold">Brand</span>}
      items={menuItems}
      actions={<Button size="sm">Sign In</Button>}
    />
  ),
};

export const Elevated: Story = {
  render: () => (
    <Navbar
      variant="elevated"
      brand={<span className="text-lg font-bold">Brand</span>}
      items={menuItems}
      actions={<Button size="sm">Sign In</Button>}
    />
  ),
};

export const WithoutMenu: Story = {
  render: () => (
    <Navbar
      brand={<span className="text-lg font-bold">Brand</span>}
      actions={<Button size="sm">Sign In</Button>}
    />
  ),
};

export const WithoutActions: Story = {
  render: () => (
    <Navbar
      brand={<span className="text-lg font-bold">Brand</span>}
      items={menuItems}
    />
  ),
};

export const Simple: Story = {
  render: () => (
    <Navbar brand={<span className="text-lg font-bold">Brand</span>} />
  ),
};

export const WithMultipleActions: Story = {
  render: () => (
    <Navbar
      brand={<span className="text-lg font-bold">Brand</span>}
      items={menuItems}
      actions={
        <>
          <Button variant="ghost" size="sm">
            Help
          </Button>
          <Button size="sm">Sign In</Button>
        </>
      }
    />
  ),
};
