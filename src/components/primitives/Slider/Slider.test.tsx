import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Slider } from './Slider';

describe('Slider', () => {
  it('renders slider', () => {
    const { container } = render(<Slider defaultValue={[50]} data-testid="slider" />);
    expect(container.querySelector('[data-testid="slider"]')).toBeTruthy();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Slider defaultValue={[50]} className="custom-class" data-testid="slider" />
    );
    expect(container.querySelector('[data-testid="slider"]')?.className).toContain('custom-class');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Slider defaultValue={[50]} ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it('renders with value prop', () => {
    const { container } = render(<Slider value={[75]} data-testid="slider" />);
    expect(container.querySelector('[data-testid="slider"]')).toBeTruthy();
  });
});
