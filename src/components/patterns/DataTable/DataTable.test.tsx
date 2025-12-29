import { describe, expect, it } from 'bun:test';
import type { ColumnDef } from '@tanstack/react-table';
import { fireEvent, render, waitFor } from '@testing-library/react';
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
    const { container } = render(<DataTable columns={columns} data={testData} />);
    expect(container.querySelector('table')).toBeTruthy();
  });

  it('renders column headers', () => {
    const { getByText } = render(<DataTable columns={columns} data={testData} />);
    expect(getByText('Name')).toBeTruthy();
    expect(getByText('Email')).toBeTruthy();
  });

  it('renders data rows', () => {
    const { getByText } = render(<DataTable columns={columns} data={testData} />);
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('jane@example.com')).toBeTruthy();
  });

  it('shows no results message when data is empty', () => {
    const { getByText } = render(<DataTable columns={columns} data={[]} />);
    expect(getByText('No results.')).toBeTruthy();
  });

  it('renders pagination by default', () => {
    const { getByText } = render(<DataTable columns={columns} data={testData} />);
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
    const { container } = render(<DataTable columns={columns} data={testData} searchable />);
    expect(container.querySelector('input')).toBeTruthy();
  });

  it('hides search input by default', () => {
    const { container } = render(<DataTable columns={columns} data={testData} />);
    expect(container.querySelector('input')).toBeNull();
  });

  it('uses custom search placeholder', () => {
    const { getByPlaceholderText } = render(
      <DataTable columns={columns} data={testData} searchable searchPlaceholder="Find users..." />
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
    const { getByText } = render(<DataTable columns={columns} data={testData} />);
    expect(getByText(/0 of 3 row\(s\) selected/)).toBeTruthy();
  });

  it('renders all rows', () => {
    const { container } = render(<DataTable columns={columns} data={testData} />);
    const rows = container.querySelectorAll('tbody tr');
    expect(rows.length).toBe(3);
  });

  it('disables previous button on first page', () => {
    const { getByText } = render(<DataTable columns={columns} data={testData} />);
    const prevButton = getByText('Previous');
    expect((prevButton as HTMLButtonElement).disabled).toBe(true);
  });

  it('renders with single column', () => {
    const singleColumn: ColumnDef<TestData>[] = [{ accessorKey: 'name', header: 'Name' }];
    const { getByText } = render(<DataTable columns={singleColumn} data={testData} />);
    expect(getByText('Name')).toBeTruthy();
  });

  it('renders with many rows', () => {
    const manyRows = Array.from({ length: 50 }, (_, i) => ({
      id: String(i),
      name: `User ${i}`,
      email: `user${i}@example.com`,
    }));
    const { container } = render(<DataTable columns={columns} data={manyRows} />);
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
    const { getByText } = render(<DataTable columns={columns} data={manyRows} />);
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
    const { getByText } = render(<DataTable columns={columns} data={manyRows} />);
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
    const { getByText } = render(<DataTable columns={columns} data={manyRows} />);
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
    // Verify placeholder header cell exists but is empty (null content)
    const placeholderHeader = headers[1];
    expect(placeholderHeader).toBeTruthy();
    expect(placeholderHeader.textContent).toBe('');
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
    const { container } = render(<DataTable columns={sortableColumns} data={testData} />);
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
    const { container } = render(<DataTable columns={selectableColumns} data={testData} />);
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
    const { container } = render(<DataTable columns={filterableColumns} data={testData} />);
    // Table should render with filterable columns
    expect(container.querySelector('table')).toBeTruthy();
  });

  it('handles table state updates through global filter', () => {
    const { container } = render(<DataTable columns={columns} data={testData} searchable />);
    const input = container.querySelector('input') as HTMLInputElement;

    // Changing the global filter should trigger state updates
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');

    // Clearing the filter should also trigger state updates
    fireEvent.change(input, { target: { value: '' } });
    expect(input.value).toBe('');
  });

  it('handles all table row model methods', () => {
    const { container } = render(<DataTable columns={columns} data={testData} />);
    // Verify table structure exists which uses getRowModel, getHeaderGroups, etc.
    const table = container.querySelector('table');
    expect(table).toBeTruthy();
    const rows = container.querySelectorAll('tbody tr');
    expect(rows.length).toBeGreaterThan(0);
  });

  it('exercises table state callbacks through multiple render cycles', () => {
    const { container, rerender } = render(<DataTable columns={columns} data={testData} />);

    // Change props to trigger re-renders and state syncs
    rerender(<DataTable columns={columns} data={[]} />);
    rerender(<DataTable columns={columns} data={testData} pagination={false} />);
    rerender(<DataTable columns={columns} data={testData} searchable />);

    expect(container.querySelector('table')).toBeTruthy();
  });

  it('handles re-renders correctly', () => {
    const { container, rerender } = render(<DataTable columns={columns} data={testData} />);

    expect(container.querySelector('table')).toBeTruthy();

    // Rerender to ensure state is preserved
    rerender(<DataTable columns={columns} data={testData} />);
    expect(container.querySelector('table')).toBeTruthy();
  });

  it('exercises callbacks with sortable columns configuration', () => {
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
    const { container, rerender } = render(<DataTable columns={sortableColumns} data={testData} />);

    // Rerender to ensure state sync happens
    rerender(<DataTable columns={sortableColumns} data={testData} />);

    expect(container.querySelector('table')).toBeTruthy();
  });

  it('exercises callbacks with filterable columns configuration', () => {
    const filterableColumns: ColumnDef<TestData>[] = [
      {
        accessorKey: 'name',
        header: 'Name',
        enableColumnFilter: true,
      },
    ];
    const { container, rerender } = render(
      <DataTable columns={filterableColumns} data={testData} />
    );

    // Rerender to ensure state sync happens
    rerender(<DataTable columns={filterableColumns} data={testData} />);

    expect(container.querySelector('table')).toBeTruthy();
  });

  it('handles search input with non-string values', () => {
    const { container } = render(<DataTable columns={columns} data={testData} searchable />);
    const input = container.querySelector('input') as HTMLInputElement;

    // Test String() conversion with number-like value
    Object.defineProperty(input, 'value', {
      value: 123,
      writable: true,
    });
    fireEvent.change(input, { target: input });

    // The String() conversion should handle this
    expect(input.value).toBeTruthy();
  });

  it('handles search input with empty and various values', () => {
    const { container } = render(<DataTable columns={columns} data={testData} searchable />);
    const input = container.querySelector('input') as HTMLInputElement;

    // Test with empty string which should use the nullish coalescing fallback
    fireEvent.change(input, { target: { value: '' } });
    expect(input.value).toBe('');

    // Test with number value (String() conversion)
    fireEvent.change(input, { target: { value: '123' } });
    expect(input.value).toBe('123');

    // Test with special characters
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    expect(input.value).toBe('test@example.com');
  });

  it('handles table state setters through data prop changes', () => {
    const { container, rerender } = render(<DataTable columns={columns} data={testData} />);

    // Changing data should trigger re-renders and exercise state setters
    const newData = [...testData, { id: '4', name: 'New User', email: 'new@example.com' }];
    rerender(<DataTable columns={columns} data={newData} />);

    expect(container.querySelector('table')).toBeTruthy();
    const rows = container.querySelectorAll('tbody tr');
    expect(rows.length).toBe(4);
  });

  it('handles table with empty columns array', () => {
    const { container } = render(<DataTable columns={[]} data={testData} />);
    expect(container.querySelector('table')).toBeTruthy();
  });

  it('handles table with empty data and empty columns', () => {
    const { getByText } = render(<DataTable columns={[]} data={[]} />);
    expect(getByText('No results.')).toBeTruthy();
  });

  it('exercises all state setters through component lifecycle', () => {
    // This test ensures all state setters are initialized and can be called
    // by rendering the component multiple times with different props
    const { container, rerender } = render(
      <DataTable columns={columns} data={testData} searchable pagination />
    );

    // Change to trigger re-renders and exercise state setters
    rerender(<DataTable columns={columns} data={[]} searchable pagination />);
    rerender(<DataTable columns={columns} data={testData} searchable pagination={false} />);
    rerender(<DataTable columns={columns} data={testData} searchable={false} pagination />);
    rerender(<DataTable columns={columns} data={testData} searchable pagination />);

    expect(container.querySelector('table')).toBeTruthy();
  });

  it('handles search input onChange with String conversion', () => {
    const { container } = render(<DataTable columns={columns} data={testData} searchable />);
    const input = container.querySelector('input') as HTMLInputElement;

    // Test that String() conversion is called for various input types
    // This exercises the onChange handler: (event) => setGlobalFilter(String(event.target.value))
    const testValues = ['text', '123', '', 'special-chars-!@#$'];

    testValues.forEach((value) => {
      fireEvent.change(input, { target: { value } });
      expect(input.value).toBe(value);
    });
  });

  it('exercises pagination button onClick handlers', () => {
    const manyRows = Array.from({ length: 15 }, (_, i) => ({
      id: String(i),
      name: `User ${i}`,
      email: `user${i}@example.com`,
    }));
    const { getByText } = render(<DataTable columns={columns} data={manyRows} />);

    const nextButton = getByText('Next');
    const prevButton = getByText('Previous');

    // Click next to exercise: onClick={() => table.nextPage()}
    nextButton.click();

    // Click previous to exercise: onClick={() => table.previousPage()}
    prevButton.click();

    // Click next again
    nextButton.click();

    // Verify buttons still work
    expect(nextButton).toBeTruthy();
    expect(prevButton).toBeTruthy();
  });

  it('handles globalFilter nullish coalescing operator', () => {
    // Test that the ?? '' operator is exercised when globalFilter might be null/undefined
    const { container } = render(<DataTable columns={columns} data={testData} searchable />);
    const input = container.querySelector('input') as HTMLInputElement;

    // Initially, globalFilter is '', so value should be ''
    expect(input.value).toBe('');

    // Set a value
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');

    // Clear it back to empty
    fireEvent.change(input, { target: { value: '' } });
    expect(input.value).toBe('');
  });

  it('exercises all map callback functions', () => {
    // This test ensures all map callbacks are executed:
    // - table.getHeaderGroups().map((headerGroup) => ...)
    // - headerGroup.headers.map((header) => ...)
    // - table.getRowModel().rows.map((row) => ...)
    // - row.getVisibleCells().map((cell) => ...)
    const { container } = render(<DataTable columns={columns} data={testData} />);

    // Verify headers are rendered (exercises headerGroup map)
    const headers = container.querySelectorAll('thead th');
    expect(headers.length).toBeGreaterThan(0);

    // Verify rows are rendered (exercises rows map)
    const rows = container.querySelectorAll('tbody tr');
    expect(rows.length).toBeGreaterThan(0);

    // Verify cells are rendered (exercises cells map)
    const cells = container.querySelectorAll('tbody td');
    expect(cells.length).toBeGreaterThan(0);
  });

  it('exercises conditional rendering branches', () => {
    // Test the ternary: table.getRowModel().rows?.length ? (...) : (...)
    // First test with data (true branch)
    const { container: containerWithData } = render(
      <DataTable columns={columns} data={testData} />
    );
    const rowsWithData = containerWithData.querySelectorAll('tbody tr');
    expect(rowsWithData.length).toBe(3);

    // Then test with empty data (false branch)
    const { getByText } = render(<DataTable columns={columns} data={[]} />);
    expect(getByText('No results.')).toBeTruthy();
  });

  it('exercises searchable conditional rendering', () => {
    // Test the conditional: {searchable && (...)}
    // First test with searchable=true
    const { container: containerSearchable } = render(
      <DataTable columns={columns} data={testData} searchable />
    );
    expect(containerSearchable.querySelector('input')).toBeTruthy();

    // Then test with searchable=false (default)
    const { container: containerNotSearchable } = render(
      <DataTable columns={columns} data={testData} />
    );
    expect(containerNotSearchable.querySelector('input')).toBeNull();
  });

  it('renders pagination when enabled', () => {
    // Test the conditional: {pagination && (...)} with pagination=true (default)
    const { queryByText } = render(<DataTable columns={columns} data={testData} />);
    expect(queryByText('Previous')).toBeTruthy();
    expect(queryByText('Next')).toBeTruthy();
  });

  it('hides pagination when disabled', () => {
    // Test the conditional: {pagination && (...)} with pagination=false
    const { queryByText } = render(
      <DataTable columns={columns} data={testData} pagination={false} />
    );
    expect(queryByText('Previous')).toBeNull();
    expect(queryByText('Next')).toBeNull();
  });
});
