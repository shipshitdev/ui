import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Pagination } from './pagination';

describe('Pagination', () => {
  it('returns null when totalPages is 1', () => {
    const { container } = render(<Pagination page={1} totalPages={1} onPageChange={vi.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  it('returns null when totalPages is 0', () => {
    const { container } = render(<Pagination page={1} totalPages={0} onPageChange={vi.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders when totalPages > 1', () => {
    const { container } = render(<Pagination page={1} totalPages={3} onPageChange={vi.fn()} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders previous button', () => {
    const { getByLabelText } = render(
      <Pagination page={2} totalPages={5} onPageChange={vi.fn()} />
    );
    expect(getByLabelText('Previous page')).toBeTruthy();
  });

  it('renders next button', () => {
    const { getByLabelText } = render(
      <Pagination page={2} totalPages={5} onPageChange={vi.fn()} />
    );
    expect(getByLabelText('Next page')).toBeTruthy();
  });

  it('disables previous button on first page', () => {
    const { getByLabelText } = render(
      <Pagination page={1} totalPages={5} onPageChange={vi.fn()} />
    );
    expect((getByLabelText('Previous page') as HTMLButtonElement).disabled).toBe(true);
  });

  it('disables next button on last page', () => {
    const { getByLabelText } = render(
      <Pagination page={5} totalPages={5} onPageChange={vi.fn()} />
    );
    expect((getByLabelText('Next page') as HTMLButtonElement).disabled).toBe(true);
  });

  it('enables previous button when not on first page', () => {
    const { getByLabelText } = render(
      <Pagination page={3} totalPages={5} onPageChange={vi.fn()} />
    );
    expect((getByLabelText('Previous page') as HTMLButtonElement).disabled).toBe(false);
  });

  it('enables next button when not on last page', () => {
    const { getByLabelText } = render(
      <Pagination page={3} totalPages={5} onPageChange={vi.fn()} />
    );
    expect((getByLabelText('Next page') as HTMLButtonElement).disabled).toBe(false);
  });

  it('calls onPageChange with page - 1 when previous is clicked', () => {
    const onPageChange = vi.fn();
    const { getByLabelText } = render(
      <Pagination page={3} totalPages={5} onPageChange={onPageChange} />
    );
    getByLabelText('Previous page').click();
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with page + 1 when next is clicked', () => {
    const onPageChange = vi.fn();
    const { getByLabelText } = render(
      <Pagination page={3} totalPages={5} onPageChange={onPageChange} />
    );
    getByLabelText('Next page').click();
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('applies custom className', () => {
    const { container } = render(
      <Pagination page={1} totalPages={3} onPageChange={vi.fn()} className="custom-pagination" />
    );
    expect(container.firstChild as HTMLElement).toBeTruthy();
    expect((container.firstChild as HTMLElement).className).toContain('custom-pagination');
  });

  describe('getPages logic — totalPages <= 5', () => {
    it('shows all pages when totalPages is 2', () => {
      const { getByText } = render(<Pagination page={1} totalPages={2} onPageChange={vi.fn()} />);
      expect(getByText('1')).toBeTruthy();
      expect(getByText('2')).toBeTruthy();
    });

    it('shows all pages when totalPages is 5', () => {
      const { getByText } = render(<Pagination page={3} totalPages={5} onPageChange={vi.fn()} />);
      expect(getByText('1')).toBeTruthy();
      expect(getByText('2')).toBeTruthy();
      expect(getByText('3')).toBeTruthy();
      expect(getByText('4')).toBeTruthy();
      expect(getByText('5')).toBeTruthy();
    });

    it('calls onPageChange with the correct page number when a page button is clicked', () => {
      const onPageChange = vi.fn();
      const { getByText } = render(
        <Pagination page={1} totalPages={5} onPageChange={onPageChange} />
      );
      getByText('3').click();
      expect(onPageChange).toHaveBeenCalledWith(3);
    });
  });

  describe('getPages logic — totalPages > 5 with ellipsis', () => {
    it('shows leading ellipsis when current page is far from start', () => {
      const { container } = render(<Pagination page={8} totalPages={10} onPageChange={vi.fn()} />);
      const ellipses = container.querySelectorAll('span');
      // At least one ellipsis span should be present
      const ellipsisSpans = Array.from(ellipses).filter((s) => s.textContent === '…');
      expect(ellipsisSpans.length).toBeGreaterThanOrEqual(1);
    });

    it('shows trailing ellipsis when current page is near start', () => {
      const { container } = render(<Pagination page={1} totalPages={10} onPageChange={vi.fn()} />);
      const ellipses = container.querySelectorAll('span');
      const ellipsisSpans = Array.from(ellipses).filter((s) => s.textContent === '…');
      expect(ellipsisSpans.length).toBeGreaterThanOrEqual(1);
    });

    it('shows first page button when start > 1', () => {
      const { getByText } = render(<Pagination page={8} totalPages={10} onPageChange={vi.fn()} />);
      expect(getByText('1')).toBeTruthy();
    });

    it('shows last page button when end < totalPages', () => {
      const { getByText } = render(<Pagination page={2} totalPages={10} onPageChange={vi.fn()} />);
      expect(getByText('10')).toBeTruthy();
    });

    it('shows both ellipses when page is in the middle', () => {
      const { container } = render(<Pagination page={5} totalPages={10} onPageChange={vi.fn()} />);
      const ellipses = container.querySelectorAll('span');
      const ellipsisSpans = Array.from(ellipses).filter((s) => s.textContent === '…');
      expect(ellipsisSpans.length).toBe(2);
    });

    it('shows page 6 as visible window page when current is 6 of 10', () => {
      const { getByText } = render(<Pagination page={6} totalPages={10} onPageChange={vi.fn()} />);
      expect(getByText('6')).toBeTruthy();
    });

    it('does not show leading ellipsis when start <= 2', () => {
      const { container } = render(<Pagination page={2} totalPages={10} onPageChange={vi.fn()} />);
      // start = max(1, min(2-1, 10-3)) = max(1,1) = 1, so no leading ellipsis
      const ellipses = container.querySelectorAll('span');
      const ellipsisSpans = Array.from(ellipses).filter((s) => s.textContent === '…');
      // Should not have leading ellipsis since start is 1 (not > 1), only trailing
      expect(ellipsisSpans.length).toBe(1);
    });

    it('does not show trailing ellipsis when end >= totalPages - 1', () => {
      const { container } = render(<Pagination page={9} totalPages={10} onPageChange={vi.fn()} />);
      // start = max(1, min(9-1, 10-3)) = max(1,7) = 7, end = min(10, 7+2) = 9
      // end (9) == totalPages-1 (9), so no trailing ellipsis
      const ellipses = container.querySelectorAll('span');
      const ellipsisSpans = Array.from(ellipses).filter((s) => s.textContent === '…');
      expect(ellipsisSpans.length).toBe(1);
    });

    it('highlights the current page button distinctly', () => {
      const { getByText } = render(<Pagination page={5} totalPages={10} onPageChange={vi.fn()} />);
      const currentPageBtn = getByText('5') as HTMLElement;
      expect(currentPageBtn.className).toContain('bg-tertiary');
    });

    it('non-current page buttons do not have active styling', () => {
      const { getByText } = render(<Pagination page={5} totalPages={10} onPageChange={vi.fn()} />);
      const nonCurrentBtn = getByText('1') as HTMLElement;
      expect(nonCurrentBtn.className).not.toContain('bg-tertiary');
    });
  });
});
