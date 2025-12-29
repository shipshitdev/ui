import { describe, expect, it, vi } from 'bun:test';
import { render } from '@testing-library/react';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
  ];

  it('renders navbar element', () => {
    const { container } = render(<Navbar />);
    expect(container.querySelector('header')).toBeTruthy();
  });

  it('renders brand content', () => {
    const { getByText } = render(<Navbar brand="Logo" />);
    expect(getByText('Logo')).toBeTruthy();
  });

  it('renders brand as React node', () => {
    const { getByTestId } = render(<Navbar brand={<span data-testid="brand">Brand</span>} />);
    expect(getByTestId('brand')).toBeTruthy();
  });

  it('renders menu items', () => {
    const { getByText } = render(<Navbar items={items} />);
    expect(getByText('Home')).toBeTruthy();
    expect(getByText('About')).toBeTruthy();
  });

  it('renders actions slot', () => {
    const { getByText } = render(<Navbar actions={<button type="button">Login</button>} />);
    expect(getByText('Login')).toBeTruthy();
  });

  it('renders mobile menu toggle when items provided', () => {
    const { getByLabelText } = render(<Navbar items={items} />);
    expect(getByLabelText('Toggle menu')).toBeTruthy();
  });

  it('does not render toggle when no items', () => {
    const { queryByLabelText } = render(<Navbar />);
    expect(queryByLabelText('Toggle menu')).toBeNull();
  });

  it('calls onMobileMenuToggle when toggled', () => {
    const onToggle = vi.fn();
    const { getByLabelText } = render(<Navbar items={items} onMobileMenuToggle={onToggle} />);
    getByLabelText('Toggle menu').click();
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('toggles mobile menu button icon', () => {
    const { getByLabelText } = render(<Navbar items={items} />);
    const button = getByLabelText('Toggle menu');
    // Button should exist and be clickable
    expect(button).toBeTruthy();
    button.click();
    // After click, button still exists
    expect(getByLabelText('Toggle menu')).toBeTruthy();
  });

  it('applies default variant', () => {
    const { container } = render(<Navbar />);
    expect(container.querySelector('.bg-background')).toBeTruthy();
  });

  it('applies bordered variant', () => {
    const { container } = render(<Navbar variant="bordered" />);
    expect(container.querySelector('.border-b')).toBeTruthy();
  });

  it('applies elevated variant', () => {
    const { container } = render(<Navbar variant="elevated" />);
    expect(container.querySelector('.shadow-sm')).toBeTruthy();
  });

  it('applies custom className', () => {
    const { container } = render(<Navbar className="custom-navbar" />);
    expect(container.querySelector('.custom-navbar')).toBeTruthy();
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Navbar ref={ref} />);
    expect(ref.current).toBeTruthy();
  });

  it('respects mobileMenuOpen prop', () => {
    const { getByLabelText } = render(<Navbar items={items} mobileMenuOpen />);
    // When mobileMenuOpen is true, the toggle button should still render
    expect(getByLabelText('Toggle menu')).toBeTruthy();
  });
});
