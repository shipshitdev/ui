import { describe, expect, it } from 'bun:test';
import { render } from '@testing-library/react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './Tooltip';

describe('Tooltip', () => {
  it('renders tooltip trigger', () => {
    const { getByText } = render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip text</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    expect(getByText('Hover me')).toBeTruthy();
  });

  it('renders as button by default', () => {
    const { getByRole } = render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Trigger</TooltipTrigger>
          <TooltipContent>Content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    expect(getByRole('button')).toBeTruthy();
  });

  it('applies custom className to trigger', () => {
    const { getByRole } = render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="custom-trigger">Trigger</TooltipTrigger>
          <TooltipContent>Content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    expect(getByRole('button').className).toContain('custom-trigger');
  });

  it('renders multiple tooltips', () => {
    const { getByText } = render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>First</TooltipTrigger>
          <TooltipContent>First tooltip</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>Second</TooltipTrigger>
          <TooltipContent>Second tooltip</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    expect(getByText('First')).toBeTruthy();
    expect(getByText('Second')).toBeTruthy();
  });

  it('supports asChild on trigger', () => {
    const { getByRole } = render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button type="button">Custom Button</button>
          </TooltipTrigger>
          <TooltipContent>Content</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    expect(getByRole('button').textContent).toBe('Custom Button');
  });
});
