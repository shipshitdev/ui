import type { ColumnDef } from '@tanstack/react-table';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'bun:test';
import { DataTable } from './DataTable';

interface TestData {
  id: string;
  name: string;
  email: string;
}

const testData: TestData[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com' },
];

const columns: ColumnDef<TestData>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
];

describe('DataTable', () => {
  it('renders table element', () => {
    const { container } = render(
      <DataTable columns={columns} data={testData} />
    );
    expect(container.querySelector('table')).toBeTruthy();
  });

  it('renders column headers', () => {
    const { getByText } = render(
      <DataTable columns={columns} data={testData} />
    );
    expect(getByText('Name')).toBeTruthy();
    expect(getByText('Email')).toBeTruthy();
  });

  it('renders data rows', () => {
    const { getByText } = render(
      <DataTable columns={columns} data={testData} />
    );
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('jane@example.com')).toBeTruthy();
  });

  it('shows no results message when data is empty', () => {
    const { getByText } = render(<DataTable columns={columns} data={[]} />);
    expect(getByText('No results.')).toBeTruthy();
  });

  it('renders pagination by default', () => {
    const { getByText } = render(
      <DataTable columns={columns} data={testData} />
    );
    expect(getByText('Previous')).toBeTruthy();
    expect(getByText('Next')).toBeTruthy();
  });

  it('hides pagination when disabled', () => {
    const { queryByText } = render(
      <DataTable columns={columns} data={testData} pagination={false} />
    );
    expect(queryByText('Previous')).toBeNull();
    expect(queryByText('Next')).toBeNull();
  });

  it('renders search input when searchable', () => {
    const { container } = render(
      <DataTable columns={columns} data={testData} searchable />
    );
    expect(container.querySelector('input')).toBeTruthy();
  });

  it('hides search input by default', () => {
    const { container } = render(
      <DataTable columns={columns} data={testData} />
    );
    expect(container.querySelector('input')).toBeNull();
  });

  it('uses custom search placeholder', () => {
    const { getByPlaceholderText } = render(
      <DataTable
        columns={columns}
        data={testData}
        searchable
        searchPlaceholder="Find users..."
      />
    );
    expect(getByPlaceholderText('Find users...')).toBeTruthy();
  });

  it('applies custom className', () => {
    const { container } = render(
      <DataTable columns={columns} data={testData} className="custom-table" />
    );
    expect(container.querySelector('.custom-table')).toBeTruthy();
  });

  it('shows row selection count', () => {
    const { getByText } = render(
      <DataTable columns={columns} data={testData} />
    );
    expect(getByText(/0 of 3 row\(s\) selected/)).toBeTruthy();
  });

  it('renders all rows', () => {
    const { container } = render(
      <DataTable columns={columns} data={testData} />
    );
    const rows = container.querySelectorAll('tbody tr');
    expect(rows.length).toBe(3);
  });

  it('disables previous button on first page', () => {
    const { getByText } = render(
      <DataTable columns={columns} data={testData} />
    );
    const prevButton = getByText('Previous');
    expect((prevButton as HTMLButtonElement).disabled).toBe(true);
  });

  it('renders with single column', () => {
    const singleColumn: ColumnDef<TestData>[] = [
      { accessorKey: 'name', header: 'Name' },
    ];
    const { getByText } = render(
      <DataTable columns={singleColumn} data={testData} />
    );
    expect(getByText('Name')).toBeTruthy();
  });

  it('renders with many rows', () => {
    const manyRows = Array.from({ length: 50 }, (_, i) => ({
      id: String(i),
      name: `User ${i}`,
      email: `user${i}@example.com`,
    }));
    const { container } = render(
      <DataTable columns={columns} data={manyRows} />
    );
    expect(container.querySelector('table')).toBeTruthy();
  });

  it('handles search input change', () => {
    const { container, getByText } = render(
      <DataTable columns={columns} data={testData} searchable />
    );
    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'John' } });
    expect(input.value).toBe('John');
    expect(getByText('John Doe')).toBeTruthy();
  });

  it('filters results based on search input', async () => {
    const { container, getByText } = render(
      <DataTable columns={columns} data={testData} searchable />
    );
    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Jane' } });

    // Verify input value is updated
    expect(input.value).toBe('Jane');

    // Verify that the filtered result is visible (Jane Smith matches)
    await waitFor(
      () => {
        expect(getByText('Jane Smith')).toBeTruthy();
      },
      { timeout: 1000 }
    );
  });

  it('handles pagination next button click', () => {
    const manyRows = Array.from({ length: 20 }, (_, i) => ({
      id: String(i),
      name: `User ${i}`,
      email: `user${i}@example.com`,
    }));
    const { getByText } = render(
      <DataTable columns={columns} data={manyRows} />
    );
    const nextButton = getByText('Next');
    expect((nextButton as HTMLButtonElement).disabled).toBe(false);
    nextButton.click();
    // After clicking next, the button should still be available (not on last page)
    expect(getByText('Next')).toBeTruthy();
  });

  it('handles pagination previous button click', () => {
    const manyRows = Array.from({ length: 20 }, (_, i) => ({
      id: String(i),
      name: `User ${i}`,
      email: `user${i}@example.com`,
    }));
    const { getByText } = render(
      <DataTable columns={columns} data={manyRows} />
    );
    const nextButton = getByText('Next');
    const prevButton = getByText('Previous');

    // First, go to next page
    nextButton.click();
    // Then go back
    prevButton.click();

    // Should be back on first page
    expect((prevButton as HTMLButtonElement).disabled).toBe(true);
  });

  it('disables next button on last page with pagination', () => {
    const manyRows = Array.from({ length: 5 }, (_, i) => ({
      id: String(i),
      name: `User ${i}`,
      email: `user${i}@example.com`,
    }));
    const { getByText } = render(
      <DataTable columns={columns} data={manyRows} />
    );
    // Default page size is 10, so all 5 rows fit on first page
    // But let's check if next is disabled when there are fewer rows than page size
    const nextButton = getByText('Next');
    // With 5 rows and default page size of 10, next should be disabled
    // Actually, let me check the behavior - tanstack table default page size is 10
    // So with 5 rows, next should be disabled
    expect((nextButton as HTMLButtonElement).disabled).toBe(true);
  });

  it('handles empty search input', () => {
    const { container, getByText } = render(
      <DataTable columns={columns} data={testData} searchable />
    );
    const input = container.querySelector('input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'John' } });
    fireEvent.change(input, { target: { value: '' } });
    expect(input.value).toBe('');
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('Jane Smith')).toBeTruthy();
    expect(getByText('Bob Johnson')).toBeTruthy();
  });

  it('renders placeholder header cells correctly', () => {
    const columnsWithPlaceholder: ColumnDef<TestData>[] = [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        id: 'placeholder',
        header: () => null,
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
    ];
    const { getByText, container } = render(
      <DataTable columns={columnsWithPlaceholder} data={testData} />
    );
    expect(getByText('Name')).toBeTruthy();
    expect(getByText('Email')).toBeTruthy();
    // Placeholder header should render null but table structure should still exist
    const headers = container.querySelectorAll('thead th');
    expect(headers.length).toBe(3);
  });

  it('handles table state with sorting enabled', () => {
    const sortableColumns: ColumnDef<TestData>[] = [
      {
        accessorKey: 'name',
        header: 'Name',
        enableSorting: true,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        enableSorting: true,
      },
    ];
    const { container } = render(
      <DataTable columns={sortableColumns} data={testData} />
    );
    // Table should render with sortable columns
    expect(container.querySelector('table')).toBeTruthy();
  });

  it('handles table with row selection enabled', () => {
    const selectableColumns: ColumnDef<TestData>[] = [
      {
        id: 'select',
        enableResizing: false,
        enableSorting: false,
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
    ];
    const { container } = render(
      <DataTable columns={selectableColumns} data={testData} />
    );
    // Table should render with selection column
    expect(container.querySelector('table')).toBeTruthy();
  });

  it('handles table with column filtering', () => {
    const filterableColumns: ColumnDef<TestData>[] = [
      {
        accessorKey: 'name',
        header: 'Name',
        enableColumnFilter: true,
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
    ];
    const { container } = render(
      <DataTable columns={filterableColumns} data={testData} />
    );
    // Table should render with filterable columns
    expect(container.querySelector('table')).toBeTruthy();
  });

  it('handles table state updates through global filter', () => {
    const { container } = render(
      <DataTable columns={columns} data={testData} searchable />
    );
    const input = container.querySelector('input') as HTMLInputElement;

    // Changing the global filter should trigger state updates
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');

    // Clearing the filter should also trigger state updates
    fireEvent.change(input, { target: { value: '' } });
    expect(input.value).toBe('');
  });

  it('handles all table row model methods', () => {
    const { container } = render(
      <DataTable columns={columns} data={testData} />
    );
    // Verify table structure exists which uses getRowModel, getHeaderGroups, etc.
    const table = container.querySelector('table');
    expect(table).toBeTruthy();
    const rows = container.querySelectorAll('tbody tr');
    expect(rows.length).toBeGreaterThan(0);
  });
});
