import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Badge } from './badge';

describe('Badge', () => {
  it('renders children', () => {
    const { getByText } = render(<Badge>New</Badge>);
    expect(getByText('New')).toBeTruthy();
  });

  it('renders as span element', () => {
    const { getByText } = render(<Badge>Status</Badge>);
    expect(getByText('Status').tagName).toBe('SPAN');
  });

  it('applies base classes', () => {
    const { getByText } = render(<Badge>Base</Badge>);
    const el = getByText('Base');
    expect(el.className).toContain('inline-flex');
    expect(el.className).toContain('items-center');
    expect(el.className).toContain('rounded-sm');
    expect(el.className).toContain('border');
    expect(el.className).toContain('font-medium');
    expect(el.className).toContain('uppercase');
  });

  it('applies default variant classes when no variant specified', () => {
    const { getByText } = render(<Badge>Default</Badge>);
    const el = getByText('Default');
    expect(el.className).toContain('bg-hover');
    expect(el.className).toContain('text-primary');
    expect(el.className).toContain('border-border');
  });

  it('applies default variant classes explicitly', () => {
    const { getByText } = render(<Badge variant="default">Default</Badge>);
    expect(getByText('Default').className).toContain('bg-hover');
  });

  it('applies done variant classes', () => {
    const { getByText } = render(<Badge variant="done">Done</Badge>);
    const el = getByText('Done');
    expect(el.className).toContain('text-done');
  });

  it('applies success variant classes', () => {
    const { getByText } = render(<Badge variant="success">Success</Badge>);
    const el = getByText('Success');
    expect(el.className).toContain('text-success');
  });

  it('applies warning variant classes', () => {
    const { getByText } = render(<Badge variant="warning">Warning</Badge>);
    const el = getByText('Warning');
    expect(el.className).toContain('text-warning');
  });

  it('applies danger variant classes', () => {
    const { getByText } = render(<Badge variant="danger">Danger</Badge>);
    const el = getByText('Danger');
    expect(el.className).toContain('text-danger');
  });

  it('applies info variant classes', () => {
    const { getByText } = render(<Badge variant="info">Info</Badge>);
    const el = getByText('Info');
    expect(el.className).toContain('text-info');
  });

  it('applies accent variant classes', () => {
    const { getByText } = render(<Badge variant="accent">Accent</Badge>);
    const el = getByText('Accent');
    expect(el.className).toContain('text-primary');
    expect(el.className).toContain('border-border-strong');
  });

  it('merges custom className', () => {
    const { getByText } = render(<Badge className="custom-class">Custom</Badge>);
    expect(getByText('Custom').className).toContain('custom-class');
  });

  it('custom className does not remove base classes', () => {
    const { getByText } = render(<Badge className="custom-class">Custom</Badge>);
    const el = getByText('Custom');
    expect(el.className).toContain('custom-class');
    expect(el.className).toContain('inline-flex');
  });

  it('passes through additional props', () => {
    const { getByTestId } = render(<Badge data-testid="badge">Props</Badge>);
    expect(getByTestId('badge')).toBeTruthy();
  });
});
