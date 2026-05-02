import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Alert, AlertDescription, AlertTitle } from './alert';

describe('Alert', () => {
  it('renders children', () => {
    const { getByText } = render(<Alert>Something went wrong</Alert>);
    expect(getByText('Something went wrong')).toBeTruthy();
  });

  it('renders as div element', () => {
    const { getByRole } = render(<Alert>Alert content</Alert>);
    expect(getByRole('alert').tagName).toBe('DIV');
  });

  it('has role="alert"', () => {
    const { getByRole } = render(<Alert>Alert content</Alert>);
    expect(getByRole('alert')).toBeTruthy();
  });

  it('applies default variant classes when no variant specified', () => {
    const { getByRole } = render(<Alert>Default</Alert>);
    const el = getByRole('alert');
    expect(el.className).toContain('bg-secondary');
    expect(el.className).toContain('border-border');
  });

  it('applies default variant classes explicitly', () => {
    const { getByRole } = render(<Alert variant="default">Default</Alert>);
    const el = getByRole('alert');
    expect(el.className).toContain('bg-secondary');
  });

  it('applies warning variant classes', () => {
    const { getByRole } = render(<Alert variant="warning">Warning message</Alert>);
    const el = getByRole('alert');
    expect(el.className).toContain('text-warning');
  });

  it('applies destructive variant classes', () => {
    const { getByRole } = render(<Alert variant="destructive">Error message</Alert>);
    const el = getByRole('alert');
    expect(el.className).toContain('text-danger');
  });

  it('applies base structural classes', () => {
    const { getByRole } = render(<Alert>Base</Alert>);
    const el = getByRole('alert');
    expect(el.className).toContain('rounded-md');
    expect(el.className).toContain('border');
    expect(el.className).toContain('p-4');
  });

  it('merges custom className', () => {
    const { getByRole } = render(<Alert className="custom-class">Custom</Alert>);
    expect(getByRole('alert').className).toContain('custom-class');
  });

  it('passes through additional props', () => {
    const { getByTestId } = render(<Alert data-testid="alert">Props</Alert>);
    expect(getByTestId('alert')).toBeTruthy();
  });
});

describe('AlertTitle', () => {
  it('renders children', () => {
    const { getByText } = render(<AlertTitle>Alert heading</AlertTitle>);
    expect(getByText('Alert heading')).toBeTruthy();
  });

  it('renders as h5 element', () => {
    const { getByText } = render(<AlertTitle>Heading</AlertTitle>);
    expect(getByText('Heading').tagName).toBe('H5');
  });

  it('applies base classes', () => {
    const { getByText } = render(<AlertTitle>Heading</AlertTitle>);
    const el = getByText('Heading');
    expect(el.className).toContain('font-medium');
    expect(el.className).toContain('leading-none');
  });

  it('merges custom className', () => {
    const { getByText } = render(<AlertTitle className="custom-class">Heading</AlertTitle>);
    expect(getByText('Heading').className).toContain('custom-class');
  });
});

describe('AlertDescription', () => {
  it('renders children', () => {
    const { getByText } = render(<AlertDescription>Description text</AlertDescription>);
    expect(getByText('Description text')).toBeTruthy();
  });

  it('renders as div element', () => {
    const { getByTestId } = render(
      <AlertDescription data-testid="desc">Description</AlertDescription>
    );
    expect(getByTestId('desc').tagName).toBe('DIV');
  });

  it('applies base classes', () => {
    const { getByTestId } = render(
      <AlertDescription data-testid="desc">Description</AlertDescription>
    );
    expect(getByTestId('desc').className).toContain('text-sm');
  });

  it('merges custom className', () => {
    const { getByTestId } = render(
      <AlertDescription className="custom-class" data-testid="desc">
        Description
      </AlertDescription>
    );
    expect(getByTestId('desc').className).toContain('custom-class');
  });
});

describe('Alert composition', () => {
  it('renders a full alert with title and description', () => {
    const { getByRole, getByText } = render(
      <Alert variant="warning">
        <AlertTitle>Watch out</AlertTitle>
        <AlertDescription>Something needs your attention.</AlertDescription>
      </Alert>
    );
    expect(getByRole('alert')).toBeTruthy();
    expect(getByText('Watch out')).toBeTruthy();
    expect(getByText('Something needs your attention.')).toBeTruthy();
  });
});
