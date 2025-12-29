import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Pagination } from './Pagination';
import type { PaginationProps } from './Pagination.types';

const meta: Meta<typeof Pagination> = {
  title: 'Composites/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

const PaginationWrapper = (args: Partial<PaginationProps>) => {
  const [page, setPage] = useState(args.currentPage || 1);
  return (
    <Pagination
      {...args}
      currentPage={page}
      totalPages={args.totalPages || 10}
      onPageChange={setPage}
    />
  );
};

export const Default: Story = {
  render: (args) => <PaginationWrapper {...args} currentPage={1} totalPages={10} />,
};

export const Small: Story = {
  render: (args) => <PaginationWrapper {...args} currentPage={5} totalPages={10} size="sm" />,
};

export const Large: Story = {
  render: (args) => <PaginationWrapper {...args} currentPage={5} totalPages={10} size="lg" />,
};

export const WithFirstLast: Story = {
  render: (args) => <PaginationWrapper {...args} currentPage={5} totalPages={20} showFirstLast />,
};

export const ManyPages: Story = {
  render: (args) => <PaginationWrapper {...args} currentPage={50} totalPages={100} />,
};

export const FewPages: Story = {
  render: (args) => <PaginationWrapper {...args} currentPage={2} totalPages={3} />,
};

export const FirstPage: Story = {
  render: (args) => <PaginationWrapper {...args} currentPage={1} totalPages={10} />,
};

export const LastPage: Story = {
  render: (args) => <PaginationWrapper {...args} currentPage={10} totalPages={10} />,
};
