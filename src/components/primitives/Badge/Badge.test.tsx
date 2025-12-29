import { describe, expect, it } from 'bun:test';
import { render } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders children', () => {
    const { getByText } = render(<Badge>New</Badge>);
    expect(getByText('New')).toBeTruthy();
  });

  it('renders as span element', () => {
    const { getByText } = render(<Badge>Status</Badge>);
    expect(getByText('Status').tagName).toBe('SPAN');
  });

  it('applies default variant classes', () => {
    const { getByText } = render(<Badge>Default</Badge>);
    expect(getByText('Default').className).toContain('bg-primary');
  });

  it('applies default variant classes', () => {
    const { getByText } = render(<Badge variant="default">Default</Badge>);
    expect(getByText('Default').className).toContain('bg-primary');
  });

  it('applies success variant classes', () => {
    const { getByText } = render(<Badge variant="success">Success</Badge>);
    expect(getByText('Success').className).toContain('bg-green');
  });

  it('applies warning variant classes', () => {
    const { getByText } = render(<Badge variant="warning">Warning</Badge>);
    expect(getByText('Warning').className).toContain('bg-yellow');
  });

  it('applies destructive variant classes', () => {
    const { getByText } = render(<Badge variant="destructive">Destructive</Badge>);
    expect(getByText('Destructive').className).toContain('bg-destructive');
  });

  it('applies outline variant classes', () => {
    const { getByText } = render(<Badge variant="outline">Outline</Badge>);
    expect(getByText('Outline').className).toContain('border');
  });

  it('applies small size classes', () => {
    const { getByText } = render(<Badge size="sm">Small</Badge>);
    expect(getByText('Small').className).toContain('text-xs');
  });

  it('applies medium size classes', () => {
    const { getByText } = render(<Badge size="md">Medium</Badge>);
    // Badge md size uses text-xs, not text-sm
    expect(getByText('Medium').className).toContain('text-xs');
  });

  it('applies large size classes', () => {
    const { getByText } = render(<Badge size="lg">Large</Badge>);
    expect(getByText('Large').className).toContain('py-1');
  });

  it('applies custom className', () => {
    const { getByText } = render(<Badge className="custom-class">Custom</Badge>);
    expect(getByText('Custom').className).toContain('custom-class');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Badge ref={ref}>Ref</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('passes through additional props', () => {
    const { getByTestId } = render(<Badge data-testid="badge">Props</Badge>);
    expect(getByTestId('badge')).toBeTruthy();
  });
});
