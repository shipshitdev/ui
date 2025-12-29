import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders skeleton', () => {
    const { container } = render(<Skeleton />);
    expect(container.querySelector('div')).toBeTruthy();
  });

  it('applies custom className', () => {
    const { container } = render(<Skeleton className="custom-class" />);
    expect(container.querySelector('div')?.className).toContain('custom-class');
  });

  it('has animate-pulse class', () => {
    const { container } = render(<Skeleton />);
    expect(container.querySelector('div')?.className).toContain('animate-pulse');
  });

  it('renders children', () => {
    const { getByText } = render(<Skeleton>Loading...</Skeleton>);
    expect(getByText('Loading...')).toBeTruthy();
  });
});
