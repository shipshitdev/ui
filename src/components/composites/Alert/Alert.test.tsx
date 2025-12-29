import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Alert, AlertDescription, AlertTitle } from './Alert';

describe('Alert', () => {
  it('renders alert', () => {
    const { getByRole } = render(<Alert>Test alert</Alert>);
    expect(getByRole('alert')).toBeTruthy();
  });

  it('applies custom className', () => {
    const { getByRole } = render(<Alert className="custom-class">Test</Alert>);
    expect(getByRole('alert').className).toContain('custom-class');
  });

  it('applies default variant', () => {
    const { getByRole } = render(<Alert>Test</Alert>);
    expect(getByRole('alert').className).toContain('bg-background');
  });

  it('applies destructive variant', () => {
    const { getByRole } = render(<Alert variant="destructive">Test</Alert>);
    expect(getByRole('alert').className).toContain('border-destructive');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Alert ref={ref}>Test</Alert>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('AlertTitle', () => {
  it('renders alert title', () => {
    const { getByText } = render(
      <Alert>
        <AlertTitle>Title</AlertTitle>
      </Alert>
    );
    expect(getByText('Title')).toBeTruthy();
  });

  it('applies custom className', () => {
    const { getByText } = render(
      <Alert>
        <AlertTitle className="custom-class">Title</AlertTitle>
      </Alert>
    );
    expect(getByText('Title').className).toContain('custom-class');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(
      <Alert>
        <AlertTitle ref={ref}>Title</AlertTitle>
      </Alert>
    );
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
  });
});

describe('AlertDescription', () => {
  it('renders alert description', () => {
    const { getByText } = render(
      <Alert>
        <AlertDescription>Description</AlertDescription>
      </Alert>
    );
    expect(getByText('Description')).toBeTruthy();
  });

  it('applies custom className', () => {
    const { getByText } = render(
      <Alert>
        <AlertDescription className="custom-class">Description</AlertDescription>
      </Alert>
    );
    expect(getByText('Description').className).toContain('custom-class');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(
      <Alert>
        <AlertDescription ref={ref}>Description</AlertDescription>
      </Alert>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
