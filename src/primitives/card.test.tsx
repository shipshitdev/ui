import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';

describe('Card', () => {
  it('renders children', () => {
    const { getByText } = render(<Card>Card content</Card>);
    expect(getByText('Card content')).toBeTruthy();
  });

  it('renders as div element', () => {
    const { getByTestId } = render(<Card data-testid="card">Content</Card>);
    expect(getByTestId('card').tagName).toBe('DIV');
  });

  it('applies base classes', () => {
    const { getByTestId } = render(<Card data-testid="card">Base</Card>);
    const el = getByTestId('card');
    expect(el.className).toContain('rounded-lg');
    expect(el.className).toContain('border');
  });

  it('merges custom className', () => {
    const { getByTestId } = render(
      <Card className="custom-class" data-testid="card">
        Custom
      </Card>
    );
    expect(getByTestId('card').className).toContain('custom-class');
  });

  it('passes through additional props', () => {
    const { getByTestId } = render(<Card data-testid="card">Props</Card>);
    expect(getByTestId('card')).toBeTruthy();
  });
});

describe('CardHeader', () => {
  it('renders children', () => {
    const { getByText } = render(<CardHeader>Header content</CardHeader>);
    expect(getByText('Header content')).toBeTruthy();
  });

  it('renders as div element', () => {
    const { getByTestId } = render(<CardHeader data-testid="header">Header</CardHeader>);
    expect(getByTestId('header').tagName).toBe('DIV');
  });

  it('applies base classes', () => {
    const { getByTestId } = render(<CardHeader data-testid="header">Header</CardHeader>);
    const el = getByTestId('header');
    expect(el.className).toContain('flex');
    expect(el.className).toContain('p-5');
  });

  it('merges custom className', () => {
    const { getByTestId } = render(
      <CardHeader className="custom-class" data-testid="header">
        Custom
      </CardHeader>
    );
    expect(getByTestId('header').className).toContain('custom-class');
  });
});

describe('CardTitle', () => {
  it('renders children', () => {
    const { getByText } = render(<CardTitle>My Title</CardTitle>);
    expect(getByText('My Title')).toBeTruthy();
  });

  it('renders as h3 element', () => {
    const { getByText } = render(<CardTitle>My Title</CardTitle>);
    expect(getByText('My Title').tagName).toBe('H3');
  });

  it('applies base classes', () => {
    const { getByText } = render(<CardTitle>Title</CardTitle>);
    const el = getByText('Title');
    expect(el.className).toContain('font-semibold');
    expect(el.className).toContain('text-sm');
  });

  it('merges custom className', () => {
    const { getByText } = render(<CardTitle className="custom-class">Title</CardTitle>);
    expect(getByText('Title').className).toContain('custom-class');
  });
});

describe('CardDescription', () => {
  it('renders children', () => {
    const { getByText } = render(<CardDescription>A description</CardDescription>);
    expect(getByText('A description')).toBeTruthy();
  });

  it('renders as p element', () => {
    const { getByText } = render(<CardDescription>Desc</CardDescription>);
    expect(getByText('Desc').tagName).toBe('P');
  });

  it('applies base classes', () => {
    const { getByText } = render(<CardDescription>Desc</CardDescription>);
    expect(getByText('Desc').className).toContain('text-xs');
  });

  it('merges custom className', () => {
    const { getByText } = render(<CardDescription className="custom-class">Desc</CardDescription>);
    expect(getByText('Desc').className).toContain('custom-class');
  });
});

describe('CardContent', () => {
  it('renders children', () => {
    const { getByText } = render(<CardContent>Content area</CardContent>);
    expect(getByText('Content area')).toBeTruthy();
  });

  it('renders as div element', () => {
    const { getByTestId } = render(<CardContent data-testid="content">Content</CardContent>);
    expect(getByTestId('content').tagName).toBe('DIV');
  });

  it('applies base classes', () => {
    const { getByTestId } = render(<CardContent data-testid="content">Content</CardContent>);
    expect(getByTestId('content').className).toContain('p-5');
  });

  it('merges custom className', () => {
    const { getByTestId } = render(
      <CardContent className="custom-class" data-testid="content">
        Custom
      </CardContent>
    );
    expect(getByTestId('content').className).toContain('custom-class');
  });
});

describe('CardFooter', () => {
  it('renders children', () => {
    const { getByText } = render(<CardFooter>Footer content</CardFooter>);
    expect(getByText('Footer content')).toBeTruthy();
  });

  it('renders as div element', () => {
    const { getByTestId } = render(<CardFooter data-testid="footer">Footer</CardFooter>);
    expect(getByTestId('footer').tagName).toBe('DIV');
  });

  it('applies flex layout', () => {
    const { getByTestId } = render(<CardFooter data-testid="footer">Footer</CardFooter>);
    expect(getByTestId('footer').className).toContain('flex');
  });

  it('applies base classes', () => {
    const { getByTestId } = render(<CardFooter data-testid="footer">Footer</CardFooter>);
    expect(getByTestId('footer').className).toContain('p-5');
  });

  it('merges custom className', () => {
    const { getByTestId } = render(
      <CardFooter className="custom-class" data-testid="footer">
        Custom
      </CardFooter>
    );
    expect(getByTestId('footer').className).toContain('custom-class');
  });
});

describe('Card composition', () => {
  it('renders a full card with all subcomponents', () => {
    const { getByTestId } = render(
      <Card data-testid="card">
        <CardHeader data-testid="header">
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
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
