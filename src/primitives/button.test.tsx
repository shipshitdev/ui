import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Button, buttonVariants } from './button';

describe('Button', () => {
  it('renders children', () => {
    const { getByRole } = render(<Button>Click me</Button>);
    expect(getByRole('button').textContent).toBe('Click me');
  });

  it('handles click events', () => {
    const onClick = vi.fn();
    const { getByRole } = render(<Button onClick={onClick}>Click</Button>);
    getByRole('button').click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    const { getByRole } = render(<Button disabled>Disabled</Button>);
    expect((getByRole('button') as HTMLButtonElement).disabled).toBe(true);
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('applies custom className', () => {
    const { getByRole } = render(<Button className="custom-class">Custom</Button>);
    expect(getByRole('button').className).toContain('custom-class');
  });

  it('has displayName', () => {
    expect(Button.displayName).toBe('Button');
  });

  describe('variants', () => {
    it('applies default variant classes', () => {
      const { getByRole } = render(<Button variant="default">Default</Button>);
      expect(getByRole('button').className).toContain('bg-accent');
    });

    it('applies secondary variant classes', () => {
      const { getByRole } = render(<Button variant="secondary">Secondary</Button>);
      expect(getByRole('button').className).toContain('bg-tertiary');
    });

    it('applies outline variant classes', () => {
      const { getByRole } = render(<Button variant="outline">Outline</Button>);
      expect(getByRole('button').className).toContain('bg-transparent');
      expect(getByRole('button').className).toContain('border');
    });

    it('applies ghost variant classes', () => {
      const { getByRole } = render(<Button variant="ghost">Ghost</Button>);
      expect(getByRole('button').className).toContain('justify-start');
    });

    it('applies pill variant classes', () => {
      const { getByRole } = render(<Button variant="pill">Pill</Button>);
      expect(getByRole('button').className).toContain('rounded-md');
    });

    it('applies destructive variant classes', () => {
      const { getByRole } = render(<Button variant="destructive">Destructive</Button>);
      expect(getByRole('button').className).toContain('bg-danger');
    });

    it('applies link variant classes', () => {
      const { getByRole } = render(<Button variant="link">Link</Button>);
      expect(getByRole('button').className).toContain('underline-offset-4');
    });
  });

  describe('sizes', () => {
    it('applies xs size classes', () => {
      const { getByRole } = render(<Button size="xs">XS</Button>);
      expect(getByRole('button').className).toContain('h-6');
    });

    it('applies sm size classes', () => {
      const { getByRole } = render(<Button size="sm">SM</Button>);
      expect(getByRole('button').className).toContain('h-7');
    });

    it('applies default size classes', () => {
      const { getByRole } = render(<Button size="default">Default</Button>);
      expect(getByRole('button').className).toContain('h-8');
    });

    it('applies md size classes (same as default)', () => {
      const { getByRole } = render(<Button size="md">MD</Button>);
      expect(getByRole('button').className).toContain('h-8');
    });

    it('applies lg size classes', () => {
      const { getByRole } = render(<Button size="lg">LG</Button>);
      expect(getByRole('button').className).toContain('h-9');
    });

    it('applies xl size classes', () => {
      const { getByRole } = render(<Button size="xl">XL</Button>);
      expect(getByRole('button').className).toContain('h-10');
    });

    it('applies icon-xs size classes', () => {
      const { getByRole } = render(<Button size="icon-xs" aria-label="icon xs" />);
      expect(getByRole('button').className).toContain('h-6');
      expect(getByRole('button').className).toContain('w-6');
    });

    it('applies icon-sm size classes', () => {
      const { getByRole } = render(<Button size="icon-sm" aria-label="icon sm" />);
      expect(getByRole('button').className).toContain('h-7');
      expect(getByRole('button').className).toContain('w-7');
    });

    it('applies icon size classes', () => {
      const { getByRole } = render(<Button size="icon" aria-label="icon" />);
      expect(getByRole('button').className).toContain('h-8');
      expect(getByRole('button').className).toContain('w-8');
    });

    it('applies icon-lg size classes', () => {
      const { getByRole } = render(<Button size="icon-lg" aria-label="icon lg" />);
      expect(getByRole('button').className).toContain('h-9');
      expect(getByRole('button').className).toContain('w-9');
    });
  });

  describe('title derived from aria-label', () => {
    it('uses explicit title when provided', () => {
      const { getByRole } = render(<Button title="My title">Button</Button>);
      expect(getByRole('button').getAttribute('title')).toBe('My title');
    });

    it('derives title from aria-label when title is not provided', () => {
      const { getByRole } = render(<Button aria-label="Close dialog">Button</Button>);
      expect(getByRole('button').getAttribute('title')).toBe('Close dialog');
    });

    it('prefers explicit title over aria-label', () => {
      const { getByRole } = render(
        <Button title="My title" aria-label="Close dialog">
          Button
        </Button>
      );
      expect(getByRole('button').getAttribute('title')).toBe('My title');
    });

    it('has no title when neither title nor aria-label is provided', () => {
      const { getByRole } = render(<Button>Button</Button>);
      expect(getByRole('button').getAttribute('title')).toBeNull();
    });

    it('passes aria-label attribute through', () => {
      const { getByRole } = render(<Button aria-label="Submit form">Submit</Button>);
      expect(getByRole('button').getAttribute('aria-label')).toBe('Submit form');
    });
  });

  describe('asChild pattern', () => {
    it('renders as child element when asChild is true', () => {
      const { container } = render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      );
      const link = container.querySelector('a');
      expect(link).toBeTruthy();
      expect(link?.textContent).toBe('Link Button');
    });

    it('does not render a button element when asChild is true', () => {
      const { container } = render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      );
      expect(container.querySelector('button')).toBeNull();
    });

    it('applies button variant classes to child element', () => {
      const { container } = render(
        <Button asChild variant="secondary">
          <a href="/test">Link Button</a>
        </Button>
      );
      const link = container.querySelector('a');
      expect(link?.className).toContain('bg-tertiary');
    });

    it('merges href from child when using asChild', () => {
      const { container } = render(
        <Button asChild>
          <a href="/dashboard">Dashboard</a>
        </Button>
      );
      expect(container.querySelector('a')?.getAttribute('href')).toBe('/dashboard');
    });
  });

  describe('buttonVariants export', () => {
    it('exports buttonVariants function', () => {
      expect(typeof buttonVariants).toBe('function');
    });

    it('generates class string from buttonVariants', () => {
      const classes = buttonVariants({ variant: 'default', size: 'default' });
      expect(typeof classes).toBe('string');
      expect(classes.length).toBeGreaterThan(0);
    });
  });
});
