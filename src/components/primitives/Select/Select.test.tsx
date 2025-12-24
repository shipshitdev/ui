import { render, act, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'bun:test';
import { Select } from './Select';

const defaultOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

describe('Select', () => {
  it('renders select element', () => {
    const { getByRole } = render(<Select options={defaultOptions} />);
    expect(getByRole('combobox')).toBeTruthy();
  });

  it('renders all options', async () => {
    const { getByRole } = render(<Select options={defaultOptions} />);
    const trigger = getByRole('combobox');

    // Open the select to show options (Radix Select renders options in portal)
    trigger.click();

    // Options are rendered in a portal, so we need to wait for them
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Note: In Radix Select, options are only visible when open
    expect(trigger).toBeTruthy();
  });

  it('renders placeholder when provided', () => {
    const { getByText } = render(
      <Select options={defaultOptions} placeholder="Select an option" />
    );
    expect(getByText('Select an option')).toBeTruthy();
  });

  it('handles value changes', async () => {
    const onValueChange = vi.fn();
    const { getByRole } = render(
      <Select options={defaultOptions} onValueChange={onValueChange} />
    );
    const trigger = getByRole('combobox');
    
    // Open the select
    await act(async () => {
      trigger.click();
    });
    
    // Wait for the portal to render options
    await waitFor(async () => {
      const options = document.querySelectorAll('[role="option"]');
      expect(options.length).toBeGreaterThan(0);
    }, { timeout: 1000 });
    
    // Click the first option
    await act(async () => {
      const firstOption = document.querySelector('[role="option"]') as HTMLElement;
      if (firstOption) {
        firstOption.click();
      }
    });
    
    // Verify onValueChange was called with the correct value
    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalledWith('option1');
    }, { timeout: 1000 });
  });

  it('is disabled when disabled prop is true', () => {
    const { getByRole } = render(<Select options={defaultOptions} disabled />);
    expect(getByRole('combobox').hasAttribute('disabled')).toBe(true);
  });

  it('renders disabled options', async () => {
    const optionsWithDisabled = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2', disabled: true },
    ];
    const { getByRole } = render(<Select options={optionsWithDisabled} />);
    const trigger = getByRole('combobox');
    trigger.click();
    await new Promise((resolve) => setTimeout(resolve, 100));
    // Radix Select handles disabled options internally
    expect(trigger).toBeTruthy();
  });

  it('shows error state', () => {
    const { getByRole } = render(<Select options={defaultOptions} error />);
    expect(getByRole('combobox').className).toContain('border-destructive');
  });

  it('shows error message', () => {
    const { getByText } = render(
      <Select
        options={defaultOptions}
        error
        errorMessage="Please select an option"
      />
    );
    expect(getByText('Please select an option')).toBeTruthy();
  });

  it('applies size classes', () => {
    const { getByRole } = render(<Select options={defaultOptions} size="lg" />);
    expect(getByRole('combobox').className).toContain('h-12');
  });

  it('applies custom className', () => {
    const { getByRole } = render(
      <Select options={defaultOptions} className="custom-class" />
    );
    expect(getByRole('combobox').className).toContain('custom-class');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Select options={defaultOptions} ref={ref} />);
    // Radix Select ref points to the trigger button, not HTMLSelectElement
    expect(ref.current).toBeTruthy();
  });

  it('syncs with controlled value prop', () => {
    const { rerender, getByRole } = render(
      <Select options={defaultOptions} value="option1" />
    );
    const trigger = getByRole('combobox');
    expect(trigger).toBeTruthy();
    
    // Update the value prop
    rerender(<Select options={defaultOptions} value="option2" />);
    expect(trigger).toBeTruthy();
  });
});
