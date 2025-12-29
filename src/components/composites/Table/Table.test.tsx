import { describe, expect, it } from 'bun:test';
import { render } from '@testing-library/react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './Table';

describe('Table', () => {
  it('renders table element', () => {
    const { container } = render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(container.querySelector('table')).toBeTruthy();
  });

  it('renders table header', () => {
    const { container } = render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Header</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    );
    expect(container.querySelector('thead')).toBeTruthy();
  });

  it('renders table body', () => {
    const { container } = render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(container.querySelector('tbody')).toBeTruthy();
  });

  it('renders table footer', () => {
    const { container } = render(
      <Table>
        <TableFooter>
          <TableRow>
            <TableCell>Footer</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
    expect(container.querySelector('tfoot')).toBeTruthy();
  });

  it('renders table row', () => {
    const { container } = render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(container.querySelector('tr')).toBeTruthy();
  });

  it('renders table head cell', () => {
    const { container } = render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Header</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    );
    expect(container.querySelector('th')).toBeTruthy();
  });

  it('renders table data cell', () => {
    const { container } = render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(container.querySelector('td')).toBeTruthy();
  });

  it('renders table caption', () => {
    const { getByText } = render(
      <Table>
        <TableCaption>Table Caption</TableCaption>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(getByText('Table Caption')).toBeTruthy();
  });

  it('applies custom className to table', () => {
    const { container } = render(
      <Table className="custom-table">
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(container.querySelector('table')?.className).toContain('custom-table');
  });

  it('applies custom className to row', () => {
    const { container } = render(
      <Table>
        <TableBody>
          <TableRow className="custom-row">
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(container.querySelector('tr')?.className).toContain('custom-row');
  });

  it('applies custom className to cell', () => {
    const { container } = render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="custom-cell">Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(container.querySelector('td')?.className).toContain('custom-cell');
  });

  it('forwards ref to table', () => {
    const ref = { current: null };
    render(
      <Table ref={ref}>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(ref.current).toBeInstanceOf(HTMLTableElement);
  });

  it('forwards ref to row', () => {
    const ref = { current: null };
    render(
      <Table>
        <TableBody>
          <TableRow ref={ref}>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(ref.current).toBeInstanceOf(HTMLTableRowElement);
  });

  it('forwards ref to cell', () => {
    const ref = { current: null };
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell ref={ref}>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(ref.current).toBeInstanceOf(HTMLTableCellElement);
  });

  it('renders complete table structure', () => {
    const { getByText } = render(
      <Table>
        <TableCaption>Users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John</TableCell>
            <TableCell>john@example.com</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>1</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
    expect(getByText('Name')).toBeTruthy();
    expect(getByText('John')).toBeTruthy();
    expect(getByText('Total')).toBeTruthy();
  });
});
