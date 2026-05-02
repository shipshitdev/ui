import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { OverlayPanel } from './overlay-panel';

describe('OverlayPanel', () => {
  it('renders children', () => {
    const { getByText } = render(
      <OverlayPanel>
        <p>Panel content</p>
      </OverlayPanel>
    );
    expect(getByText('Panel content')).toBeTruthy();
  });

  it('renders wrapper with data-slot="overlay-panel-wrapper"', () => {
    const { container } = render(<OverlayPanel>Content</OverlayPanel>);
    expect(container.querySelector('[data-slot="overlay-panel-wrapper"]')).toBeTruthy();
  });

  it('renders inner panel with data-slot="overlay-panel"', () => {
    const { container } = render(<OverlayPanel>Content</OverlayPanel>);
    expect(container.querySelector('[data-slot="overlay-panel"]')).toBeTruthy();
  });

  describe('side prop', () => {
    it('defaults to right side', () => {
      const { container } = render(<OverlayPanel>Content</OverlayPanel>);
      const wrapper = container.querySelector('[data-slot="overlay-panel-wrapper"]');
      expect(wrapper?.className).toContain('right-0');
      expect(wrapper?.className).not.toContain('left-0');
    });

    it('positions wrapper to the right when side="right"', () => {
      const { container } = render(<OverlayPanel side="right">Content</OverlayPanel>);
      const wrapper = container.querySelector('[data-slot="overlay-panel-wrapper"]');
      expect(wrapper?.className).toContain('right-0');
    });

    it('positions wrapper to the left when side="left"', () => {
      const { container } = render(<OverlayPanel side="left">Content</OverlayPanel>);
      const wrapper = container.querySelector('[data-slot="overlay-panel-wrapper"]');
      expect(wrapper?.className).toContain('left-0');
      expect(wrapper?.className).not.toContain('right-0');
    });

    it('applies right-side border and shadow when side="right"', () => {
      const { container } = render(<OverlayPanel side="right">Content</OverlayPanel>);
      const panel = container.querySelector('[data-slot="overlay-panel"]');
      expect(panel?.className).toContain('border-l');
    });

    it('applies left-side border and shadow when side="left"', () => {
      const { container } = render(<OverlayPanel side="left">Content</OverlayPanel>);
      const panel = container.querySelector('[data-slot="overlay-panel"]');
      expect(panel?.className).toContain('border-r');
    });
  });

  describe('resize handle', () => {
    it('does not render resize handle when onResizeStart is not provided', () => {
      const { container } = render(<OverlayPanel>Content</OverlayPanel>);
      expect(container.querySelector('[data-slot="overlay-panel-resize-handle"]')).toBeNull();
    });

    it('renders resize handle when onResizeStart is provided', () => {
      const { container } = render(<OverlayPanel onResizeStart={vi.fn()}>Content</OverlayPanel>);
      expect(container.querySelector('[data-slot="overlay-panel-resize-handle"]')).toBeTruthy();
    });

    it('resize handle has default aria-label', () => {
      const { container } = render(<OverlayPanel onResizeStart={vi.fn()}>Content</OverlayPanel>);
      const handle = container.querySelector('[data-slot="overlay-panel-resize-handle"]');
      expect(handle?.getAttribute('aria-label')).toBe('Resize overlay panel');
    });

    it('resize handle uses custom resizeHandleLabel', () => {
      const { container } = render(
        <OverlayPanel onResizeStart={vi.fn()} resizeHandleLabel="Drag to resize">
          Content
        </OverlayPanel>
      );
      const handle = container.querySelector('[data-slot="overlay-panel-resize-handle"]');
      expect(handle?.getAttribute('aria-label')).toBe('Drag to resize');
    });

    it('calls onResizeStart on mousedown', () => {
      const onResizeStart = vi.fn();
      const { container } = render(
        <OverlayPanel onResizeStart={onResizeStart}>Content</OverlayPanel>
      );
      const handle = container.querySelector(
        '[data-slot="overlay-panel-resize-handle"]'
      ) as HTMLElement;
      handle.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      expect(onResizeStart).toHaveBeenCalledTimes(1);
    });

    it('positions resize handle on left edge for right-side panel', () => {
      const { container } = render(
        <OverlayPanel side="right" onResizeStart={vi.fn()}>
          Content
        </OverlayPanel>
      );
      const handle = container.querySelector('[data-slot="overlay-panel-resize-handle"]');
      expect(handle?.className).toContain('left-0');
    });

    it('positions resize handle on right edge for left-side panel', () => {
      const { container } = render(
        <OverlayPanel side="left" onResizeStart={vi.fn()}>
          Content
        </OverlayPanel>
      );
      const handle = container.querySelector('[data-slot="overlay-panel-resize-handle"]');
      expect(handle?.className).toContain('right-0');
    });
  });

  describe('width and sizing styles', () => {
    it('applies width style to inner panel', () => {
      const { container } = render(<OverlayPanel width={400}>Content</OverlayPanel>);
      const panel = container.querySelector('[data-slot="overlay-panel"]') as HTMLElement;
      expect(panel?.style.width).toBe('400px');
    });

    it('applies minWidth style to inner panel', () => {
      const { container } = render(<OverlayPanel minWidth={200}>Content</OverlayPanel>);
      const panel = container.querySelector('[data-slot="overlay-panel"]') as HTMLElement;
      expect(panel?.style.minWidth).toBe('200px');
    });

    it('applies maxWidth style to inner panel', () => {
      const { container } = render(<OverlayPanel maxWidth={800}>Content</OverlayPanel>);
      const panel = container.querySelector('[data-slot="overlay-panel"]') as HTMLElement;
      expect(panel?.style.maxWidth).toBe('800px');
    });

    it('applies string width style', () => {
      const { container } = render(<OverlayPanel width="50%">Content</OverlayPanel>);
      const panel = container.querySelector('[data-slot="overlay-panel"]') as HTMLElement;
      expect(panel?.style.width).toBe('50%');
    });

    it('merges custom style with width/minWidth/maxWidth', () => {
      const { container } = render(
        <OverlayPanel style={{ background: 'red' }} width={300}>
          Content
        </OverlayPanel>
      );
      const panel = container.querySelector('[data-slot="overlay-panel"]') as HTMLElement;
      expect(panel?.style.background).toBe('red');
      expect(panel?.style.width).toBe('300px');
    });
  });

  describe('className props', () => {
    it('applies className to inner panel', () => {
      const { container } = render(<OverlayPanel className="panel-class">Content</OverlayPanel>);
      const panel = container.querySelector('[data-slot="overlay-panel"]');
      expect(panel?.className).toContain('panel-class');
    });

    it('applies containerClassName to wrapper', () => {
      const { container } = render(
        <OverlayPanel containerClassName="wrapper-class">Content</OverlayPanel>
      );
      const wrapper = container.querySelector('[data-slot="overlay-panel-wrapper"]');
      expect(wrapper?.className).toContain('wrapper-class');
    });
  });

  it('passes additional props to inner panel element', () => {
    const { container } = render(<OverlayPanel data-testid="my-panel">Content</OverlayPanel>);
    expect(container.querySelector('[data-testid="my-panel"]')).toBeTruthy();
  });

  it('wrapper has pointer-events-none class', () => {
    const { container } = render(<OverlayPanel>Content</OverlayPanel>);
    const wrapper = container.querySelector('[data-slot="overlay-panel-wrapper"]');
    expect(wrapper?.className).toContain('pointer-events-none');
  });

  it('inner panel has pointer-events-auto class', () => {
    const { container } = render(<OverlayPanel>Content</OverlayPanel>);
    const panel = container.querySelector('[data-slot="overlay-panel"]');
    expect(panel?.className).toContain('pointer-events-auto');
  });
});
