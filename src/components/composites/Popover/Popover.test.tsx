import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

describe('Popover', () => {
  it('renders popover with trigger and content', () => {
    const { getByText } = render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    );
    expect(getByText('Open')).toBeTruthy();
  });
});

describe('PopoverTrigger', () => {
  it('renders popover trigger', () => {
    const { getByText } = render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    );
    expect(getByText('Open')).toBeTruthy();
  });
});

describe('PopoverContent', () => {
  it('renders popover content when open', () => {
    const { getByText } = render(
      <Popover open>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    );
    expect(getByText('Content')).toBeTruthy();
  });

  it('applies custom className', () => {
    const { getByText } = render(
      <Popover open>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent className="custom-class">Content</PopoverContent>
      </Popover>
    );
    expect(getByText('Content').className).toContain('custom-class');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(
      <Popover open>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent ref={ref}>Content</PopoverContent>
      </Popover>
    );
    expect(ref.current).toBeTruthy();
  });
});
