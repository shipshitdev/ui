import { describe, expect, it } from 'bun:test';
import { render } from '@testing-library/react';
import { Link } from './Link';

describe('Link', () => {
  it('renders anchor element', () => {
    const { getByRole } = render(<Link href="/test">Test Link</Link>);
    expect(getByRole('link')).toBeTruthy();
  });

  it('renders children', () => {
    const { getByText } = render(<Link href="/test">Click me</Link>);
    expect(getByText('Click me')).toBeTruthy();
  });

  it('applies href attribute', () => {
    const { getByRole } = render(<Link href="/path">Link</Link>);
    expect(getByRole('link').getAttribute('href')).toBe('/path');
  });

  it('applies default variant classes', () => {
    const { getByRole } = render(<Link href="/test">Link</Link>);
    expect(getByRole('link').className).toContain('text-foreground');
  });

  it('applies primary variant classes', () => {
    const { getByRole } = render(
      <Link href="/test" variant="primary">
        Primary
      </Link>
    );
    expect(getByRole('link').className).toContain('text-primary');
  });

  it('applies secondary variant classes', () => {
    const { getByRole } = render(
      <Link href="/test" variant="secondary">
        Secondary
      </Link>
    );
    expect(getByRole('link').className).toContain('text-muted-foreground');
  });

  it('applies muted variant classes', () => {
    const { getByRole } = render(
      <Link href="/test" variant="muted">
        Muted
      </Link>
    );
    expect(getByRole('link').className).toContain('text-muted-foreground');
  });

  it('applies underline none', () => {
    const { getByRole } = render(
      <Link href="/test" underline="none">
        No underline
      </Link>
    );
    expect(getByRole('link').className).toContain('no-underline');
  });

  it('applies underline hover by default', () => {
    const { getByRole } = render(<Link href="/test">Link</Link>);
    expect(getByRole('link').className).toContain('hover:underline');
  });

  it('applies underline always', () => {
    const { getByRole } = render(
      <Link href="/test" underline="always">
        Always underlined
      </Link>
    );
    expect(getByRole('link').className).toContain('underline');
  });

  it('applies custom className', () => {
    const { getByRole } = render(
      <Link href="/test" className="custom-class">
        Custom
      </Link>
    );
    expect(getByRole('link').className).toContain('custom-class');
  });

  it('renders as span when asChild is true', () => {
    const { container } = render(<Link asChild>As child</Link>);
    expect(container.querySelector('span')).toBeTruthy();
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(
      <Link ref={ref} href="/test">
        Ref
      </Link>
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it('passes additional props', () => {
    const { getByRole } = render(
      <Link href="/test" target="_blank" rel="noopener">
        External
      </Link>
    );
    expect(getByRole('link').getAttribute('target')).toBe('_blank');
    expect(getByRole('link').getAttribute('rel')).toBe('noopener');
  });
});
