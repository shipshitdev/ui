import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../composites/DropdownMenu/DropdownMenu';
import { Button } from '../../primitives/Button/Button';
import { DataTable } from './DataTable';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    id: 'actions',
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => {}}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const data: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'Active',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'User',
    status: 'Inactive',
  },
  {
    id: '4',
    name: 'Alice Williams',
    email: 'alice@example.com',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: '5',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    role: 'User',
    status: 'Active',
  },
];

const meta: Meta<typeof DataTable<User, unknown>> = {
  title: 'Patterns/DataTable',
  component: DataTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataTable<User, unknown>>;

export const Default: Story = {
  render: () => <DataTable columns={columns} data={data} />,
};

export const WithSearch: Story = {
  render: () => (
    <DataTable columns={columns} data={data} searchable searchPlaceholder="Search users..." />
  ),
};

export const WithoutPagination: Story = {
  render: () => <DataTable columns={columns} data={data} pagination={false} />,
};

export const WithSearchAndPagination: Story = {
  render: () => (
    <div className="w-[800px]">
      <DataTable
        columns={columns}
        data={data}
        searchable
        searchPlaceholder="Search users..."
        pagination
      />
    </div>
  ),
};

export const ManyRows: Story = {
  render: () => {
    const manyData = Array.from({ length: 50 }, (_, i) => ({
      id: String(i + 1),
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i % 2 === 0 ? 'Admin' : 'User',
      status: i % 3 === 0 ? 'Inactive' : 'Active',
    }));
    return (
      <div className="w-[800px]">
        <DataTable
          columns={columns}
          data={manyData}
          searchable
          searchPlaceholder="Search users..."
          pagination
        />
      </div>
    );
  },
};
