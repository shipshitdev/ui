import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Keycap } from './keycap';

describe('Keycap', () => {
  it('renders children', () => {
    const { getByText } = render(<Keycap>⌘</Keycap>);
    expect(getByText('⌘')).toBeTruthy();
  });

  it('renders as span element', () => {
    const { getByText } = render(<Keycap>K</Keycap>);
    expect(getByText('K').tagName).toBe('SPAN');
  });

  it('applies base classes', () => {
    const { getByText } = render(<Keycap>K</Keycap>);
    const el = getByText('K');
    expect(el.className).toContain('rounded-sm');
    expect(el.className).toContain('border');
    expect(el.className).toContain('font-semibold');
  });

  it('merges custom className', () => {
    const { getByText } = render(<Keycap className="custom-class">K</Keycap>);
    expect(getByText('K').className).toContain('custom-class');
  });

  it('passes through additional HTML attributes', () => {
    const { getByTestId } = render(<Keycap data-testid="keycap">K</Keycap>);
    expect(getByTestId('keycap')).toBeTruthy();
  });

  it('renders text children correctly', () => {
    const { getByText } = render(<Keycap>Enter</Keycap>);
    expect(getByText('Enter').tagName).toBe('SPAN');
  });
});
