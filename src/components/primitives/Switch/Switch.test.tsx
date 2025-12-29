import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Switch } from './Switch';

describe('Switch', () => {
  it('renders switch', () => {
    const { container } = render(<Switch data-testid="switch" />);
    expect(container.querySelector('[data-testid="switch"]')).toBeTruthy();
  });

  it('applies custom className', () => {
    const { container } = render(<Switch className="custom-class" data-testid="switch" />);
    expect(container.querySelector('[data-testid="switch"]')?.className).toContain('custom-class');
  });

  it('can be checked', () => {
    const { container } = render(<Switch checked data-testid="switch" />);
    expect(container.querySelector('[data-testid="switch"]')).toBeTruthy();
  });

  it('can be disabled', () => {
    const { container } = render(<Switch disabled data-testid="switch" />);
    const element = container.querySelector('[data-testid="switch"]') as HTMLElement;
    expect(element.hasAttribute('disabled')).toBe(true);
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Switch ref={ref} />);
    expect(ref.current).toBeTruthy();
  });
});
