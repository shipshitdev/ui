import type { Meta, StoryObj } from '@storybook/react-vite';
import { Menu } from './Menu';

const meta: Meta<typeof Menu> = {
  title: 'Composites/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Vertical: Story = {
  render: () => (
    <Menu
      orientation="vertical"
      items={[
        { label: 'Home', href: '/', active: true },
        { label: 'About', href: '/about' },
        { label: 'Products', href: '/products' },
        { label: 'Contact', href: '/contact' },
      ]}
    />
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Menu
      orientation="horizontal"
      items={[
        { label: 'Home', href: '/', active: true },
        { label: 'About', href: '/about' },
        { label: 'Products', href: '/products' },
        { label: 'Contact', href: '/contact' },
      ]}
    />
  ),
};

export const WithActions: Story = {
  render: () => (
    <Menu
      orientation="vertical"
      items={[
        { label: 'Save', onClick: () => alert('Saved!') },
        { label: 'Edit', onClick: () => alert('Editing...') },
        { label: 'Delete', onClick: () => alert('Deleted!') },
      ]}
    />
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <Menu
      orientation="vertical"
      items={[
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Disabled Item', href: '/disabled', disabled: true },
        { label: 'Contact', href: '/contact' },
      ]}
    />
  ),
};

export const Mixed: Story = {
  render: () => (
    <Menu
      orientation="vertical"
      items={[
        { label: 'Home', href: '/', active: true },
        { label: 'Save', onClick: () => alert('Saved!') },
        { label: 'About', href: '/about' },
        { label: 'Disabled', disabled: true },
        { label: 'Contact', href: '/contact' },
      ]}
    />
  ),
};
