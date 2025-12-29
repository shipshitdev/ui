import { describe, expect, it, vi } from 'bun:test';
import { act, render, waitFor } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders checkbox element', () => {
    const { getByRole } = render(<Checkbox />);
    expect(getByRole('checkbox')).toBeTruthy();
  });

  it('renders label when provided', () => {
    const { getByText } = render(<Checkbox label="Accept terms" />);
    expect(getByText('Accept terms')).toBeTruthy();
  });

  it('renders description when provided', () => {
    const { getByText } = render(<Checkbox description="Please read the terms carefully" />);
    expect(getByText('Please read the terms carefully')).toBeTruthy();
  });

  it('renders both label and description', () => {
    const { getByText } = render(
      <Checkbox label="Accept terms" description="Required for signup" />
    );
    expect(getByText('Accept terms')).toBeTruthy();
    expect(getByText('Required for signup')).toBeTruthy();
  });

  it('handles change events', async () => {
    const onCheckedChange = vi.fn();
    const { getByRole } = render(<Checkbox onCheckedChange={onCheckedChange} />);
    await act(async () => {
      getByRole('checkbox').click();
    });
    await waitFor(() => {
      expect(onCheckedChange).toHaveBeenCalled();
    });
  });

  it('is disabled when disabled prop is true', () => {
    const { getByRole } = render(<Checkbox disabled />);
    expect(getByRole('checkbox').hasAttribute('disabled')).toBe(true);
  });

  it('can be checked by default', () => {
    const { getByRole } = render(<Checkbox defaultChecked />);
    expect(getByRole('checkbox').getAttribute('data-state')).toBe('checked');
  });

  it('shows error state', () => {
    const { getByRole } = render(<Checkbox error />);
    expect(getByRole('checkbox').className).toContain('border-destructive');
  });

  it('applies size classes', () => {
    const { getByRole } = render(<Checkbox size="lg" />);
    expect(getByRole('checkbox').className).toContain('h-5');
  });

  it('applies custom className', () => {
    const { getByRole } = render(<Checkbox className="custom-class" />);
    expect(getByRole('checkbox').className).toContain('custom-class');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Checkbox ref={ref} />);
    // Radix Checkbox ref points to the root element, not HTMLInputElement
    expect(ref.current).toBeTruthy();
  });

  it('uses provided id', () => {
    const { getByRole } = render(<Checkbox id="my-checkbox" label="My checkbox" />);
    expect(getByRole('checkbox').id).toBe('my-checkbox');
  });

  it('label is clickable and toggles checkbox', async () => {
    const { getByText, getByRole } = render(<Checkbox label="Click me" />);
    const label = getByText('Click me');
    await act(async () => {
      label.click();
    });
    await waitFor(() => {
      // Radix Checkbox uses data-state attribute
      expect(getByRole('checkbox').getAttribute('data-state')).toBe('checked');
    });
  });
});
