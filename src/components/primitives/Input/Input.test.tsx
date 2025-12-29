import { describe, expect, it, vi } from 'bun:test';
import { render } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('renders input element', () => {
    const { getByPlaceholderText } = render(<Input placeholder="Enter text" />);
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('accepts onChange handler', () => {
    const onChange = vi.fn();
    const { container } = render(<Input onChange={onChange} />);
    const input = container.querySelector('input')!;
    expect(input).toBeTruthy();
    expect(input.getAttribute('type')).toBe('text');
  });

  it('is disabled when disabled prop is true', () => {
    const { getByPlaceholderText } = render(<Input disabled placeholder="Disabled" />);
    expect((getByPlaceholderText('Disabled') as HTMLInputElement).disabled).toBe(true);
  });

  it('renders left icon', () => {
    const { getByTestId } = render(<Input leftIcon={<span data-testid="left-icon">L</span>} />);
    expect(getByTestId('left-icon')).toBeTruthy();
  });

  it('renders right icon', () => {
    const { getByTestId } = render(<Input rightIcon={<span data-testid="right-icon">R</span>} />);
    expect(getByTestId('right-icon')).toBeTruthy();
  });

  it('shows error state', () => {
    const { getByPlaceholderText } = render(<Input error placeholder="Error" />);
    expect(getByPlaceholderText('Error').getAttribute('aria-invalid')).toBe('true');
  });

  it('shows error message', () => {
    const { getByText } = render(<Input error errorMessage="This field is required" />);
    expect(getByText('This field is required')).toBeTruthy();
  });

  it('applies size classes', () => {
    const { getByPlaceholderText } = render(<Input size="lg" placeholder="Large" />);
    expect(getByPlaceholderText('Large').className).toContain('h-12');
  });

  it('applies custom className', () => {
    const { getByPlaceholderText } = render(
      <Input className="custom-class" placeholder="Custom" />
    );
    expect(getByPlaceholderText('Custom').className).toContain('custom-class');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('defaults to text type', () => {
    const { getByPlaceholderText } = render(<Input placeholder="Text" />);
    expect(getByPlaceholderText('Text').getAttribute('type')).toBe('text');
  });

  it('accepts different input types', () => {
    const { getByPlaceholderText } = render(<Input type="password" placeholder="Password" />);
    expect(getByPlaceholderText('Password').getAttribute('type')).toBe('password');
  });
});
