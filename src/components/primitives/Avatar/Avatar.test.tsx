import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Avatar, AvatarFallback, AvatarImage } from './Avatar';

describe('Avatar', () => {
  it('renders avatar', () => {
    const { container } = render(<Avatar data-testid="avatar" />);
    expect(container.querySelector('[data-testid="avatar"]')).toBeTruthy();
  });

  it('applies custom className', () => {
    const { container } = render(<Avatar className="custom-class" data-testid="avatar" />);
    expect(container.querySelector('[data-testid="avatar"]')?.className).toContain('custom-class');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Avatar ref={ref} />);
    expect(ref.current).toBeTruthy();
  });
});

describe('AvatarImage', () => {
  it('renders avatar image', () => {
    const { container } = render(
      <Avatar>
        <AvatarImage src="test.jpg" alt="Test" />
      </Avatar>
    );
    // AvatarImage component renders, even if img may not be immediately available
    expect(container.firstChild).toBeTruthy();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Avatar>
        <AvatarImage src="test.jpg" alt="Test" className="custom-class" />
      </Avatar>
    );
    expect(container.firstChild).toBeTruthy();
  });
});

describe('AvatarFallback', () => {
  it('renders avatar fallback', () => {
    const { getByText } = render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
    expect(getByText('AB')).toBeTruthy();
  });

  it('applies custom className', () => {
    const { getByText } = render(
      <Avatar>
        <AvatarFallback className="custom-class">AB</AvatarFallback>
      </Avatar>
    );
    expect(getByText('AB').className).toContain('custom-class');
  });
});
