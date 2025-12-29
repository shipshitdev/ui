import { describe, expect, it } from 'bun:test';
import { render } from '@testing-library/react';
import { Loading } from './Loading';

describe('Loading', () => {
  it('renders loading element', () => {
    const { container } = render(<Loading />);
    expect(container.firstChild).toBeTruthy();
  });

  it('renders spinner variant by default', () => {
    const { container } = render(<Loading />);
    expect(container.querySelector('.animate-spin')).toBeTruthy();
  });

  it('renders dots variant', () => {
    const { container } = render(<Loading variant="dots" />);
    const spans = container.querySelectorAll('span');
    expect(spans.length).toBeGreaterThanOrEqual(3);
  });

  it('renders bars variant', () => {
    const { container } = render(<Loading variant="bars" />);
    const spans = container.querySelectorAll('span');
    expect(spans.length).toBeGreaterThanOrEqual(3);
  });

  it('renders pulse variant', () => {
    const { container } = render(<Loading variant="pulse" />);
    expect(container.querySelector('.animate-pulse')).toBeTruthy();
  });

  it('applies small size classes for spinner', () => {
    const { container } = render(<Loading variant="spinner" size="sm" />);
    expect(container.querySelector('.h-4')).toBeTruthy();
    expect(container.querySelector('.w-4')).toBeTruthy();
  });

  it('applies medium size classes for spinner', () => {
    const { container } = render(<Loading variant="spinner" size="md" />);
    expect(container.querySelector('.h-6')).toBeTruthy();
    expect(container.querySelector('.w-6')).toBeTruthy();
  });

  it('applies large size classes for spinner', () => {
    const { container } = render(<Loading variant="spinner" size="lg" />);
    expect(container.querySelector('.h-8')).toBeTruthy();
    expect(container.querySelector('.w-8')).toBeTruthy();
  });

  it('renders text when provided', () => {
    const { getByText } = render(<Loading text="Loading..." />);
    expect(getByText('Loading...')).toBeTruthy();
  });

  it('renders text with dots variant', () => {
    const { getByText } = render(<Loading variant="dots" text="Please wait" />);
    expect(getByText('Please wait')).toBeTruthy();
  });

  it('renders text with bars variant', () => {
    const { getByText } = render(<Loading variant="bars" text="Processing" />);
    expect(getByText('Processing')).toBeTruthy();
  });

  it('applies custom className', () => {
    const { container } = render(<Loading className="custom-class" />);
    expect(container.firstChild).toBeTruthy();
    expect((container.firstChild as HTMLElement).className).toContain('custom-class');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Loading ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('passes additional props', () => {
    const { container } = render(<Loading data-testid="loading" />);
    expect(container.querySelector('[data-testid="loading"]')).toBeTruthy();
  });
});
