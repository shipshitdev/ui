import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Progress } from './Progress';

describe('Progress', () => {
  it('renders progress bar', () => {
    const { container } = render(<Progress value={50} data-testid="progress" />);
    expect(container.querySelector('[data-testid="progress"]')).toBeTruthy();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Progress value={50} className="custom-class" data-testid="progress" />
    );
    expect(container.querySelector('[data-testid="progress"]')?.className).toContain(
      'custom-class'
    );
  });

  it('handles value prop', () => {
    const { container } = render(<Progress value={75} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('handles undefined value', () => {
    const { container } = render(<Progress />);
    expect(container.firstChild).toBeTruthy();
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Progress value={50} ref={ref} />);
    expect(ref.current).toBeTruthy();
  });
});
