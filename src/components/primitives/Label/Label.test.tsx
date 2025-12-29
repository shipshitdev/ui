import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Label } from './Label';

describe('Label', () => {
  it('renders label text', () => {
    const { getByText } = render(<Label>Test Label</Label>);
    expect(getByText('Test Label')).toBeTruthy();
  });

  it('applies custom className', () => {
    const { getByText } = render(<Label className="custom-class">Test</Label>);
    expect(getByText('Test').className).toContain('custom-class');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Label ref={ref}>Test</Label>);
    expect(ref.current).toBeTruthy();
  });

  it('renders as label element', () => {
    const { getByText } = render(<Label>Test</Label>);
    expect(getByText('Test').tagName).toBe('LABEL');
  });
});
