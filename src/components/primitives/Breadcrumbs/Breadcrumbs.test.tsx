import { describe, expect, it } from 'bun:test';
import { render } from '@testing-library/react';
import { Breadcrumbs } from './Breadcrumbs';

describe('Breadcrumbs', () => {
  const items = [
    { label: 'Products', href: '/products' },
    { label: 'Category', href: '/products/category' },
    { label: 'Current Page' },
  ];

  it('renders navigation element', () => {
    const { getByRole } = render(<Breadcrumbs items={items} />);
    expect(getByRole('navigation')).toBeTruthy();
  });

  it('has correct aria-label', () => {
    const { getByRole } = render(<Breadcrumbs items={items} />);
    expect(getByRole('navigation').getAttribute('aria-label')).toBe('Breadcrumb');
  });

  it('renders all items', () => {
    const { getByText } = render(<Breadcrumbs items={items} />);
    expect(getByText('Products')).toBeTruthy();
    expect(getByText('Category')).toBeTruthy();
    expect(getByText('Current Page')).toBeTruthy();
  });

  it('shows home icon by default', () => {
    const { getByLabelText } = render(<Breadcrumbs items={items} />);
    expect(getByLabelText('Home')).toBeTruthy();
  });

  it('hides home icon when showHome is false', () => {
    const { queryByLabelText } = render(<Breadcrumbs items={items} showHome={false} />);
    expect(queryByLabelText('Home')).toBeNull();
  });

  it('marks last item as current page', () => {
    const { getByText } = render(<Breadcrumbs items={items} />);
    expect(getByText('Current Page').getAttribute('aria-current')).toBe('page');
  });

  it('renders links for items with href', () => {
    const { getByText } = render(<Breadcrumbs items={items} />);
    const productsLink = getByText('Products').closest('a');
    expect(productsLink).toBeTruthy();
    expect(productsLink?.getAttribute('href')).toBe('/products');
  });

  it('renders span for items without href (non-last)', () => {
    const itemsWithoutHref = [{ label: 'No Link' }, { label: 'Last' }];
    const { getByText } = render(<Breadcrumbs items={itemsWithoutHref} />);
    const noLinkElement = getByText('No Link');
    expect(noLinkElement.tagName.toLowerCase()).toBe('span');
  });

  it('applies custom className', () => {
    const { getByRole } = render(<Breadcrumbs items={items} className="custom-class" />);
    expect(getByRole('navigation').className).toContain('custom-class');
  });

  it('uses custom homeHref', () => {
    const { getByLabelText } = render(<Breadcrumbs items={items} homeHref="/dashboard" />);
    const homeLink = getByLabelText('Home').closest('a');
    expect(homeLink?.getAttribute('href')).toBe('/dashboard');
  });

  it('renders custom separator', () => {
    const { container } = render(
      <Breadcrumbs items={items} separator={<span className="custom-separator">/</span>} />
    );
    expect(container.querySelector('.custom-separator')).toBeTruthy();
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Breadcrumbs ref={ref} items={items} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
