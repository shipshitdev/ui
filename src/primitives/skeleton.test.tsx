import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Skeleton } from './skeleton';

describe('Skeleton', () => {
  it('renders as output element', () => {
    const { getByTestId } = render(<Skeleton data-testid="skeleton" />);
    expect(getByTestId('skeleton').tagName).toBe('OUTPUT');
  });

  it('has aria-busy="true"', () => {
    const { getByTestId } = render(<Skeleton data-testid="skeleton" />);
    expect(getByTestId('skeleton').getAttribute('aria-busy')).toBe('true');
  });

  it('applies animate-pulse class', () => {
    const { getByTestId } = render(<Skeleton data-testid="skeleton" />);
    expect(getByTestId('skeleton').className).toContain('animate-pulse');
  });

  it('applies rounded class', () => {
    const { getByTestId } = render(<Skeleton data-testid="skeleton" />);
    expect(getByTestId('skeleton').className).toContain('rounded-md');
  });

  it('merges custom className', () => {
    const { getByTestId } = render(<Skeleton className="custom-class" data-testid="skeleton" />);
    const el = getByTestId('skeleton');
    expect(el.className).toContain('custom-class');
    expect(el.className).toContain('animate-pulse');
  });

  it('passes through additional props', () => {
    const { getByTestId } = render(<Skeleton data-testid="skeleton" style={{ width: 100 }} />);
    expect(getByTestId('skeleton')).toBeTruthy();
  });

  it('renders children when provided', () => {
    const { getByText } = render(<Skeleton>Loading...</Skeleton>);
    expect(getByText('Loading...')).toBeTruthy();
  });
});
