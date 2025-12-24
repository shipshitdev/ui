import { render } from '@testing-library/react';
import { describe, it, expect } from 'bun:test';
import { Card, CardHeader, CardContent, CardFooter } from './Card';

describe('Card', () => {
  it('renders children', () => {
    const { getByText } = render(<Card>Card content</Card>);
    expect(getByText('Card content')).toBeTruthy();
  });

  it('renders as div element', () => {
    const { getByTestId } = render(<Card data-testid="card">Content</Card>);
    expect(getByTestId('card').tagName).toBe('DIV');
  });

  it('applies default variant classes', () => {
    const { getByTestId } = render(<Card data-testid="card">Default</Card>);
    expect(getByTestId('card').className).toContain('border');
  });

  it('applies elevated variant classes', () => {
    const { getByTestId } = render(
      <Card variant="elevated" data-testid="card">
        Elevated
      </Card>
    );
    expect(getByTestId('card').className).toContain('shadow-md');
  });

  it('applies outline variant classes', () => {
    const { getByTestId } = render(
      <Card variant="outline" data-testid="card">
        Outline
      </Card>
    );
    expect(getByTestId('card').className).toContain('border');
  });

  it('applies hover classes when hover is true', () => {
    const { getByTestId } = render(
      <Card hover data-testid="card">
        Hoverable
      </Card>
    );
    expect(getByTestId('card').className).toContain('cursor-pointer');
  });

  it('applies padding classes', () => {
    const { getByTestId } = render(
      <Card padding="md" data-testid="card">
        Padded
      </Card>
    );
    expect(getByTestId('card').className).toContain('p-6');
  });

  it('applies custom className', () => {
    const { getByTestId } = render(
      <Card className="custom-class" data-testid="card">
        Custom
      </Card>
    );
    expect(getByTestId('card').className).toContain('custom-class');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Card ref={ref}>Ref</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('CardHeader', () => {
  it('renders children', () => {
    const { getByText } = render(<CardHeader>Header content</CardHeader>);
    expect(getByText('Header content')).toBeTruthy();
  });

  it('applies default classes', () => {
    const { getByTestId } = render(
      <CardHeader data-testid="header">Header</CardHeader>
    );
    expect(getByTestId('header').className).toContain('p-6');
  });

  it('applies custom className', () => {
    const { getByTestId } = render(
      <CardHeader className="custom-class" data-testid="header">
        Custom
      </CardHeader>
    );
    expect(getByTestId('header').className).toContain('custom-class');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<CardHeader ref={ref}>Ref</CardHeader>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('CardContent', () => {
  it('renders children', () => {
    const { getByText } = render(<CardContent>Content area</CardContent>);
    expect(getByText('Content area')).toBeTruthy();
  });

  it('applies default classes', () => {
    const { getByTestId } = render(
      <CardContent data-testid="content">Content</CardContent>
    );
    expect(getByTestId('content').className).toContain('p-6');
  });

  it('applies custom className', () => {
    const { getByTestId } = render(
      <CardContent className="custom-class" data-testid="content">
        Custom
      </CardContent>
    );
    expect(getByTestId('content').className).toContain('custom-class');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<CardContent ref={ref}>Ref</CardContent>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('CardFooter', () => {
  it('renders children', () => {
    const { getByText } = render(<CardFooter>Footer content</CardFooter>);
    expect(getByText('Footer content')).toBeTruthy();
  });

  it('applies default classes', () => {
    const { getByTestId } = render(
      <CardFooter data-testid="footer">Footer</CardFooter>
    );
    expect(getByTestId('footer').className).toContain('p-6');
  });

  it('applies flex layout', () => {
    const { getByTestId } = render(
      <CardFooter data-testid="footer">Footer</CardFooter>
    );
    expect(getByTestId('footer').className).toContain('flex');
  });

  it('applies custom className', () => {
    const { getByTestId } = render(
      <CardFooter className="custom-class" data-testid="footer">
        Custom
      </CardFooter>
    );
    expect(getByTestId('footer').className).toContain('custom-class');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<CardFooter ref={ref}>Ref</CardFooter>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('Card composition', () => {
  it('renders full card with all subcomponents', () => {
    const { getByTestId } = render(
      <Card data-testid="card">
        <CardHeader data-testid="header">Title</CardHeader>
        <CardContent data-testid="content">Body</CardContent>
        <CardFooter data-testid="footer">Actions</CardFooter>
      </Card>
    );
    expect(getByTestId('card')).toBeTruthy();
    expect(getByTestId('header')).toBeTruthy();
    expect(getByTestId('content')).toBeTruthy();
    expect(getByTestId('footer')).toBeTruthy();
  });
});
