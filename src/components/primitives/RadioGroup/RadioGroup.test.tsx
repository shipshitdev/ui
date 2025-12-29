import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RadioGroup, RadioGroupItem } from './RadioGroup';

describe('RadioGroup', () => {
  it('renders radio group', () => {
    const { container } = render(
      <RadioGroup data-testid="radio-group">
        <RadioGroupItem value="option1" />
      </RadioGroup>
    );
    expect(container.querySelector('[data-testid="radio-group"]')).toBeTruthy();
  });

  it('applies custom className', () => {
    const { container } = render(
      <RadioGroup className="custom-class" data-testid="radio-group">
        <RadioGroupItem value="option1" />
      </RadioGroup>
    );
    expect(container.querySelector('[data-testid="radio-group"]')?.className).toContain(
      'custom-class'
    );
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(
      <RadioGroup ref={ref}>
        <RadioGroupItem value="option1" />
      </RadioGroup>
    );
    expect(ref.current).toBeTruthy();
  });
});

describe('RadioGroupItem', () => {
  it('renders radio group item', () => {
    const { container } = render(
      <RadioGroup>
        <RadioGroupItem value="option1" data-testid="radio-item" />
      </RadioGroup>
    );
    expect(container.querySelector('[data-testid="radio-item"]')).toBeTruthy();
  });

  it('applies custom className', () => {
    const { container } = render(
      <RadioGroup>
        <RadioGroupItem value="option1" className="custom-class" data-testid="radio-item" />
      </RadioGroup>
    );
    expect(container.querySelector('[data-testid="radio-item"]')?.className).toContain(
      'custom-class'
    );
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(
      <RadioGroup>
        <RadioGroupItem value="option1" ref={ref} />
      </RadioGroup>
    );
    expect(ref.current).toBeTruthy();
  });
});
