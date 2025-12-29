import { describe, expect, it, vi } from 'bun:test';
import { render } from '@testing-library/react';
import { Menu } from './Menu';

describe('Menu', () => {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', onClick: vi.fn() },
  ];

  it('renders menu element', () => {
    const { container } = render(<Menu items={items} />);
    expect(container.querySelector('nav')).toBeTruthy();
  });

  it('renders all menu items', () => {
    const { getByText } = render(<Menu items={items} />);
    expect(getByText('Home')).toBeTruthy();
    expect(getByText('About')).toBeTruthy();
    expect(getByText('Contact')).toBeTruthy();
  });

  it('renders links for items with href', () => {
    const { container } = render(<Menu items={items} />);
    const links = container.querySelectorAll('a');
    expect(links.length).toBe(2);
  });

  it('renders buttons for items without href', () => {
    const { container } = render(<Menu items={items} />);
    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBe(1);
  });

  it('calls onClick when button clicked', () => {
    const onClick = vi.fn();
    const menuItems = [{ label: 'Click', onClick }];
    const { getByText } = render(<Menu items={menuItems} />);
    getByText('Click').closest('button')?.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('applies vertical orientation by default', () => {
    const { container } = render(<Menu items={items} />);
    expect(container.querySelector('.flex-col')).toBeTruthy();
  });

  it('applies horizontal orientation', () => {
    const { container } = render(<Menu items={items} orientation="horizontal" />);
    expect(container.querySelector('.flex-row')).toBeTruthy();
  });

  it('applies active state', () => {
    const menuItems = [{ label: 'Active', href: '/', active: true }];
    const { container } = render(<Menu items={menuItems} />);
    expect(container.querySelector('.bg-accent')).toBeTruthy();
  });

  it('applies disabled state', () => {
    const menuItems = [{ label: 'Disabled', href: '/', disabled: true }];
    const { container } = render(<Menu items={menuItems} />);
    expect(container.querySelector('.opacity-50')).toBeTruthy();
  });

  it('disables button when disabled', () => {
    const menuItems = [{ label: 'Disabled', onClick: vi.fn(), disabled: true }];
    const { container } = render(<Menu items={menuItems} />);
    const button = container.querySelector('button');
    expect(button?.disabled).toBe(true);
  });

  it('applies custom className', () => {
    const { container } = render(<Menu items={items} className="custom-menu" />);
    expect(container.querySelector('.custom-menu')).toBeTruthy();
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Menu ref={ref} items={items} />);
    expect(ref.current).toBeTruthy();
  });

  it('renders empty menu with no items', () => {
    const { container } = render(<Menu items={[]} />);
    expect(container.querySelector('nav')).toBeTruthy();
    expect(container.querySelectorAll('a').length).toBe(0);
  });
});
