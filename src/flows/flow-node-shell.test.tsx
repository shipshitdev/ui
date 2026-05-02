import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FlowNodeShell, type FlowNodeShellStatus, type FlowNodeTone } from './flow-node-shell';

vi.mock('@xyflow/react', () => ({
  NodeResizer: ({
    isVisible,
    minWidth,
    minHeight,
    lineClassName,
    handleClassName,
  }: {
    isVisible?: boolean;
    minWidth?: number;
    minHeight?: number;
    lineClassName?: string;
    handleClassName?: string;
  }) => (
    <div
      data-testid="node-resizer"
      data-visible={String(isVisible)}
      data-min-width={minWidth}
      data-min-height={minHeight}
      data-line-class={lineClassName}
      data-handle-class={handleClassName}
    />
  ),
}));

describe('FlowNodeShell', () => {
  describe('title', () => {
    it('renders title text', () => {
      const { getByText } = render(<FlowNodeShell title="My Node" />);
      expect(getByText('My Node')).toBeTruthy();
    });

    it('renders a ReactNode title', () => {
      const { getByText } = render(<FlowNodeShell title={<span>Custom Title</span>} />);
      expect(getByText('Custom Title')).toBeTruthy();
    });
  });

  describe('optional description', () => {
    it('renders description when provided', () => {
      const { getByText } = render(<FlowNodeShell title="Node" description="A description" />);
      expect(getByText('A description')).toBeTruthy();
    });

    it('does not render description element when omitted', () => {
      const { container } = render(<FlowNodeShell title="Node" />);
      expect(container.querySelector('p')).toBeNull();
    });
  });

  describe('optional meta', () => {
    it('renders meta when provided', () => {
      const { getByText } = render(<FlowNodeShell title="Node" meta={<span>meta-tag</span>} />);
      expect(getByText('meta-tag')).toBeTruthy();
    });

    it('does not render meta section when omitted', () => {
      const { queryByText } = render(<FlowNodeShell title="Node" />);
      expect(queryByText('meta-tag')).toBeNull();
    });
  });

  describe('optional headerActions', () => {
    it('renders headerActions when provided', () => {
      const { getByText } = render(
        <FlowNodeShell title="Node" headerActions={<button type="button">Edit</button>} />
      );
      expect(getByText('Edit')).toBeTruthy();
    });

    it('does not render headerActions container when omitted', () => {
      const { container } = render(<FlowNodeShell title="Node" />);
      // No header actions wrapper should exist
      expect(container.querySelector('.flex.items-center.gap-1\\.5')).toBeNull();
    });
  });

  describe('optional footer', () => {
    it('renders footer when provided', () => {
      const { getByText } = render(
        <FlowNodeShell title="Node" footer={<span>Footer content</span>} />
      );
      expect(getByText('Footer content')).toBeTruthy();
    });

    it('does not render footer when omitted', () => {
      const { queryByText } = render(<FlowNodeShell title="Node" />);
      expect(queryByText('Footer content')).toBeNull();
    });
  });

  describe('tones', () => {
    const tones: FlowNodeTone[] = ['default', 'success', 'warning', 'danger', 'info', 'accent'];

    for (const tone of tones) {
      it(`applies ${tone} tone border class`, () => {
        const { container } = render(<FlowNodeShell title="Node" tone={tone} />);
        const node = container.firstChild as HTMLElement;
        // Each tone maps to a unique CSS class
        const toneClassMap: Record<FlowNodeTone, string> = {
          default: 'border-border',
          success: 'border-success',
          warning: 'border-warning',
          danger: 'border-danger',
          info: 'border-info',
          accent: 'border-border-strong',
        };
        expect(node.className).toContain(toneClassMap[tone].split('/')[0]);
      });
    }

    it('defaults to "default" tone', () => {
      const { container } = render(<FlowNodeShell title="Node" />);
      const node = container.firstChild as HTMLElement;
      expect(node.className).toContain('border-border');
    });
  });

  describe('statuses', () => {
    it('does not render badge for idle status', () => {
      const { container } = render(<FlowNodeShell title="Node" status="idle" />);
      // No badge rendered for idle
      expect(container.querySelector('[data-variant]')).toBeNull();
    });

    const nonIdleStatuses: Array<[FlowNodeShellStatus, string]> = [
      ['running', 'Running'],
      ['success', 'Success'],
      ['warning', 'Warning'],
      ['error', 'Error'],
    ];

    for (const [status, label] of nonIdleStatuses) {
      it(`renders status badge for ${status}`, () => {
        const { getByText } = render(<FlowNodeShell title="Node" status={status} />);
        expect(getByText(label)).toBeTruthy();
      });
    }

    it('renders custom statusLabel when provided', () => {
      const { getByText } = render(
        <FlowNodeShell title="Node" status="running" statusLabel="In progress..." />
      );
      expect(getByText('In progress...')).toBeTruthy();
    });
  });

  describe('selected', () => {
    it('adds ring class when selected is true', () => {
      const { container } = render(<FlowNodeShell title="Node" selected />);
      const node = container.firstChild as HTMLElement;
      expect(node.className).toContain('ring-1');
    });

    it('does not add ring class when selected is false', () => {
      const { container } = render(<FlowNodeShell title="Node" selected={false} />);
      const node = container.firstChild as HTMLElement;
      expect(node.className).not.toContain('ring-1');
    });

    it('sets data-selected attribute', () => {
      const { container } = render(<FlowNodeShell title="Node" selected />);
      const node = container.firstChild as HTMLElement;
      expect(node.getAttribute('data-selected')).toBe('true');
    });
  });

  describe('dimmed', () => {
    it('adds opacity class when dimmed is true', () => {
      const { container } = render(<FlowNodeShell title="Node" dimmed />);
      const node = container.firstChild as HTMLElement;
      expect(node.className).toContain('opacity-60');
    });

    it('does not add opacity class when dimmed is false', () => {
      const { container } = render(<FlowNodeShell title="Node" dimmed={false} />);
      const node = container.firstChild as HTMLElement;
      expect(node.className).not.toContain('opacity-60');
    });
  });

  describe('resizable', () => {
    it('renders NodeResizer when resizable is true', () => {
      const { getByTestId } = render(<FlowNodeShell title="Node" resizable />);
      expect(getByTestId('node-resizer')).toBeTruthy();
    });

    it('does not render NodeResizer when resizable is false', () => {
      const { queryByTestId } = render(<FlowNodeShell title="Node" resizable={false} />);
      expect(queryByTestId('node-resizer')).toBeNull();
    });

    it('passes isVisible=selected to NodeResizer', () => {
      const { getByTestId } = render(<FlowNodeShell title="Node" resizable selected />);
      expect(getByTestId('node-resizer').getAttribute('data-visible')).toBe('true');
    });

    it('passes minWidth and minHeight to NodeResizer', () => {
      const { getByTestId } = render(
        <FlowNodeShell title="Node" resizable minWidth={300} minHeight={200} />
      );
      const resizer = getByTestId('node-resizer');
      expect(resizer.getAttribute('data-min-width')).toBe('300');
      expect(resizer.getAttribute('data-min-height')).toBe('200');
    });
  });

  describe('children', () => {
    it('renders children in the body section', () => {
      const { getByText } = render(
        <FlowNodeShell title="Node">
          <span>Body content</span>
        </FlowNodeShell>
      );
      expect(getByText('Body content')).toBeTruthy();
    });
  });

  describe('className passthrough', () => {
    it('merges custom className onto the root div', () => {
      const { container } = render(<FlowNodeShell title="Node" className="extra-class" />);
      const node = container.firstChild as HTMLElement;
      expect(node.className).toContain('extra-class');
    });
  });
});
