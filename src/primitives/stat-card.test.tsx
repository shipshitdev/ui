import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { StatCard } from './stat-card';

describe('StatCard', () => {
  it('renders the value', () => {
    const { getByText } = render(<StatCard label="Total Users" value={42} />);
    expect(getByText('42')).toBeTruthy();
  });

  it('renders a string value', () => {
    const { getByText } = render(<StatCard label="Status" value="Active" />);
    expect(getByText('Active')).toBeTruthy();
  });

  it('renders the label', () => {
    const { getByText } = render(<StatCard label="Total Users" value={42} />);
    expect(getByText('Total Users')).toBeTruthy();
  });

  it('renders subtitle when provided', () => {
    const { getByText } = render(
      <StatCard label="Revenue" value={1000} subtitle="vs last month +12%" />
    );
    expect(getByText('vs last month +12%')).toBeTruthy();
  });

  it('does not render subtitle when not provided', () => {
    const { queryByText } = render(<StatCard label="Revenue" value={1000} />);
    expect(queryByText('vs last month')).toBeNull();
  });

  it('renders icon when provided', () => {
    const { getByTestId } = render(
      <StatCard label="Users" value={5} icon={<span data-testid="user-icon">U</span>} />
    );
    expect(getByTestId('user-icon')).toBeTruthy();
  });

  it('does not render icon container when icon is not provided', () => {
    const { container } = render(<StatCard label="Users" value={5} />);
    // Icon wrapper div should not be present
    const iconContainer = container.querySelector('.text-secondary');
    expect(iconContainer).toBeNull();
  });

  it('applies custom className', () => {
    const { container } = render(<StatCard label="Users" value={5} className="custom-class" />);
    expect(container.querySelector('.custom-class')).toBeTruthy();
  });

  describe('tones', () => {
    it('applies no extra classes for default tone', () => {
      const { container } = render(<StatCard label="Users" value={5} tone="default" />);
      const card = container.firstChild as HTMLElement;
      expect(card?.className).not.toContain('border-agent');
      expect(card?.className).not.toContain('border-success');
    });

    it('applies agent tone classes', () => {
      const { container } = render(<StatCard label="Users" value={5} tone="agent" />);
      const card = container.firstChild as HTMLElement;
      expect(card?.className).toContain('border-agent');
      expect(card?.className).toContain('bg-agent');
    });

    it('applies success tone classes', () => {
      const { container } = render(<StatCard label="Users" value={5} tone="success" />);
      const card = container.firstChild as HTMLElement;
      expect(card?.className).toContain('border-success');
      expect(card?.className).toContain('bg-success');
    });

    it('applies warn tone classes', () => {
      const { container } = render(<StatCard label="Users" value={5} tone="warn" />);
      const card = container.firstChild as HTMLElement;
      expect(card?.className).toContain('border-warning');
      expect(card?.className).toContain('bg-warning');
    });

    it('applies danger tone classes', () => {
      const { container } = render(<StatCard label="Users" value={5} tone="danger" />);
      const card = container.firstChild as HTMLElement;
      expect(card?.className).toContain('border-danger');
      expect(card?.className).toContain('bg-danger');
    });

    it('defaults to default tone when tone is not provided', () => {
      const { container } = render(<StatCard label="Users" value={5} />);
      const card = container.firstChild as HTMLElement;
      expect(card?.className).not.toContain('border-agent');
      expect(card?.className).not.toContain('border-success');
      expect(card?.className).not.toContain('border-warning');
      expect(card?.className).not.toContain('border-danger');
    });
  });

  it('renders value with large text styling', () => {
    const { container } = render(<StatCard label="Count" value={99} />);
    const valueEl = container.querySelector('.text-3xl');
    expect(valueEl).toBeTruthy();
    expect(valueEl?.textContent).toBe('99');
  });

  it('renders label with uppercase styling', () => {
    const { container } = render(<StatCard label="My Label" value={1} />);
    const labelEl = container.querySelector('.uppercase');
    expect(labelEl).toBeTruthy();
    expect(labelEl?.textContent).toBe('My Label');
  });

  it('renders all elements together', () => {
    const { getByText, getByTestId } = render(
      <StatCard
        label="Active Sessions"
        value={123}
        subtitle="Running now"
        icon={<span data-testid="session-icon">S</span>}
        tone="success"
      />
    );
    expect(getByText('123')).toBeTruthy();
    expect(getByText('Active Sessions')).toBeTruthy();
    expect(getByText('Running now')).toBeTruthy();
    expect(getByTestId('session-icon')).toBeTruthy();
  });
});
