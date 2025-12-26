import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slash } from 'lucide-react';
import { Breadcrumbs } from './Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Primitives/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  render: () => (
    <Breadcrumbs
      items={[
        { label: 'Products', href: '/products' },
        { label: 'Electronics', href: '/products/electronics' },
        { label: 'Laptops' },
      ]}
    />
  ),
};

export const WithoutHome: Story = {
  render: () => (
    <Breadcrumbs
      showHome={false}
      items={[
        { label: 'Products', href: '/products' },
        { label: 'Electronics', href: '/products/electronics' },
        { label: 'Laptops' },
      ]}
    />
  ),
};

export const CustomSeparator: Story = {
  render: () => (
    <Breadcrumbs
      separator={<Slash className="h-4 w-4 text-muted-foreground" />}
      items={[
        { label: 'Products', href: '/products' },
        { label: 'Electronics', href: '/products/electronics' },
        { label: 'Laptops' },
      ]}
    />
  ),
};

export const TextSeparator: Story = {
  render: () => (
    <Breadcrumbs
      separator={<span className="text-muted-foreground">/</span>}
      items={[
        { label: 'Products', href: '/products' },
        { label: 'Electronics', href: '/products/electronics' },
        { label: 'Laptops' },
      ]}
    />
  ),
};

export const LongPath: Story = {
  render: () => (
    <Breadcrumbs
      items={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Electronics', href: '/products/electronics' },
        { label: 'Computers', href: '/products/electronics/computers' },
        { label: 'Laptops', href: '/products/electronics/computers/laptops' },
        { label: 'Gaming Laptops' },
      ]}
    />
  ),
};

export const SingleItem: Story = {
  render: () => <Breadcrumbs items={[{ label: 'Current Page' }]} />,
};
