import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Separator } from './Separator';

describe('Separator', () => {
  it('renders separator', () => {
    const { container } = render(<Separator data-testid="separator" />);
    expect(container.querySelector('[data-testid="separator"]')).toBeTruthy();
  });

  it('applies custom className', () => {
    const { container } = render(<Separator className="custom-class" data-testid="separator" />);
    expect(container.querySelector('[data-testid="separator"]')?.className).toContain(
      'custom-class'
    );
  });

  it('renders horizontal by default', () => {
    const { container } = render(<Separator data-testid="separator" />);
    const element = container.querySelector('[data-testid="separator"]');
    expect(element?.className).toContain('h-[1px]');
  });

  it('renders vertical when orientation is vertical', () => {
    const { container } = render(<Separator orientation="vertical" data-testid="separator" />);
    const element = container.querySelector('[data-testid="separator"]');
    expect(element?.className).toContain('h-full');
    expect(element?.className).toContain('w-[1px]');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Separator ref={ref} />);
    expect(ref.current).toBeTruthy();
  });
});
