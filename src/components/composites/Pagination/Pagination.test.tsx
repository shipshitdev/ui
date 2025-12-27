import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'bun:test';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 10,
    onPageChange: vi.fn(),
  };

  it('renders pagination element', () => {
    const { getByRole } = render(<Pagination {...defaultProps} />);
    expect(getByRole('navigation')).toBeTruthy();
  });

  it('has correct aria-label', () => {
    const { getByRole } = render(<Pagination {...defaultProps} />);
    expect(getByRole('navigation').getAttribute('aria-label')).toBe(
      'Pagination'
    );
  });

  it('renders previous button', () => {
    const { getByLabelText } = render(<Pagination {...defaultProps} />);
    expect(getByLabelText('Previous page')).toBeTruthy();
  });

  it('renders next button', () => {
    const { getByLabelText } = render(<Pagination {...defaultProps} />);
    expect(getByLabelText('Next page')).toBeTruthy();
  });

  it('disables previous on first page', () => {
    const { getByLabelText } = render(
      <Pagination {...defaultProps} currentPage={1} />
    );
    expect(
      (getByLabelText('Previous page') as HTMLButtonElement).disabled
    ).toBe(true);
  });

  it('disables next on last page', () => {
    const { getByLabelText } = render(
      <Pagination {...defaultProps} currentPage={10} />
    );
    expect((getByLabelText('Next page') as HTMLButtonElement).disabled).toBe(
      true
    );
  });

  it('calls onPageChange when page clicked', () => {
    const onPageChange = vi.fn();
    const { getByLabelText } = render(
      <Pagination {...defaultProps} onPageChange={onPageChange} />
    );
    getByLabelText('Page 2').click();
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange on next click', () => {
    const onPageChange = vi.fn();
    const { getByLabelText } = render(
      <Pagination {...defaultProps} onPageChange={onPageChange} />
    );
    getByLabelText('Next page').click();
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange on previous click', () => {
    const onPageChange = vi.fn();
    const { getByLabelText } = render(
      <Pagination
        {...defaultProps}
        currentPage={5}
        onPageChange={onPageChange}
      />
    );
    getByLabelText('Previous page').click();
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('shows first/last buttons when enabled', () => {
    const { getByLabelText } = render(
      <Pagination {...defaultProps} showFirstLast />
    );
    expect(getByLabelText('First page')).toBeTruthy();
    expect(getByLabelText('Last page')).toBeTruthy();
  });

  it('hides first/last buttons by default', () => {
    const { queryByLabelText } = render(<Pagination {...defaultProps} />);
    expect(queryByLabelText('First page')).toBeNull();
    expect(queryByLabelText('Last page')).toBeNull();
  });

  it('marks current page with aria-current', () => {
    const { getByLabelText } = render(
      <Pagination {...defaultProps} currentPage={3} />
    );
    expect(getByLabelText('Page 3').getAttribute('aria-current')).toBe('page');
  });

  it('applies primary variant to current page', () => {
    const { getByLabelText } = render(
      <Pagination {...defaultProps} currentPage={3} />
    );
    expect(getByLabelText('Page 3').className).toContain('bg-primary');
  });

  it('applies custom className', () => {
    const { getByRole } = render(
      <Pagination {...defaultProps} className="custom-pagination" />
    );
    expect(getByRole('navigation').className).toContain('custom-pagination');
  });

  it('respects maxVisible prop', () => {
    const { getByLabelText } = render(
      <Pagination {...defaultProps} maxVisible={3} />
    );
    expect(getByLabelText('Page 1')).toBeTruthy();
    expect(getByLabelText('Page 2')).toBeTruthy();
    expect(getByLabelText('Page 3')).toBeTruthy();
  });

  it('shows ellipsis for large page ranges', () => {
    const { container } = render(
      <Pagination {...defaultProps} currentPage={5} maxVisible={5} />
    );
    // Check that ellipsis spans exist in the pagination
    const ellipsis = container.querySelectorAll('.text-muted-foreground');
    expect(ellipsis.length).toBeGreaterThan(0);
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Pagination ref={ref} {...defaultProps} />);
    expect(ref.current).toBeTruthy();
  });

  it('applies small size variant', () => {
    const { container } = render(<Pagination {...defaultProps} size="sm" />);
    const ul = container.querySelector('ul');
    expect(ul?.className).toContain('[&_button]:h-8');
    expect(ul?.className).toContain('[&_button]:text-xs');
  });

  it('applies medium size variant', () => {
    const { container } = render(<Pagination {...defaultProps} size="md" />);
    const ul = container.querySelector('ul');
    expect(ul?.className).toContain('[&_button]:h-10');
    expect(ul?.className).toContain('[&_button]:text-sm');
  });

  it('applies large size variant', () => {
    const { container } = render(<Pagination {...defaultProps} size="lg" />);
    const ul = container.querySelector('ul');
    expect(ul?.className).toContain('[&_button]:h-12');
    expect(ul?.className).toContain('[&_button]:text-base');
  });

  it('calls onPageChange on first button click', () => {
    const onPageChange = vi.fn();
    const { getByLabelText } = render(
      <Pagination
        {...defaultProps}
        currentPage={5}
        showFirstLast
        onPageChange={onPageChange}
      />
    );
    getByLabelText('First page').click();
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('calls onPageChange on last button click', () => {
    const onPageChange = vi.fn();
    const { getByLabelText } = render(
      <Pagination
        {...defaultProps}
        currentPage={5}
        showFirstLast
        onPageChange={onPageChange}
      />
    );
    getByLabelText('Last page').click();
    expect(onPageChange).toHaveBeenCalledWith(10);
  });

  it('disables first button on first page', () => {
    const { getByLabelText } = render(
      <Pagination {...defaultProps} currentPage={1} showFirstLast />
    );
    expect((getByLabelText('First page') as HTMLButtonElement).disabled).toBe(
      true
    );
  });

  it('disables last button on last page', () => {
    const { getByLabelText } = render(
      <Pagination {...defaultProps} currentPage={10} showFirstLast />
    );
    expect((getByLabelText('Last page') as HTMLButtonElement).disabled).toBe(
      true
    );
  });

  it('handles pagination near the start', () => {
    const { getByLabelText } = render(
      <Pagination {...defaultProps} currentPage={2} maxVisible={5} />
    );
    expect(getByLabelText('Page 1')).toBeTruthy();
    expect(getByLabelText('Page 2')).toBeTruthy();
  });

  it('handles pagination near the end', () => {
    const { getByLabelText } = render(
      <Pagination {...defaultProps} currentPage={9} maxVisible={5} />
    );
    expect(getByLabelText('Page 9')).toBeTruthy();
    expect(getByLabelText('Page 10')).toBeTruthy();
  });

  it('handles single page', () => {
    const { getByLabelText } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={vi.fn()} />
    );
    expect(getByLabelText('Page 1')).toBeTruthy();
    expect(
      (getByLabelText('Previous page') as HTMLButtonElement).disabled
    ).toBe(true);
    expect((getByLabelText('Next page') as HTMLButtonElement).disabled).toBe(
      true
    );
  });
});
