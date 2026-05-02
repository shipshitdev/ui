import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FlowCanvas } from './flow-canvas';

vi.mock('@xyflow/react', () => {
  const ReactFlow = ({
    children,
    className,
    fitView,
    proOptions,
  }: {
    children?: React.ReactNode;
    className?: string;
    fitView?: boolean;
    proOptions?: Record<string, unknown>;
  }) => (
    <div
      data-testid="react-flow"
      className={className}
      data-fit-view={String(fitView)}
      data-hide-attribution={String(proOptions?.hideAttribution)}
    >
      {children}
    </div>
  );

  const Background = ({
    gap,
    size,
    variant,
    color,
  }: {
    gap?: number;
    size?: number;
    variant?: string;
    color?: string;
  }) => (
    <div
      data-testid="background"
      data-gap={gap}
      data-size={size}
      data-variant={variant}
      data-color={color}
    />
  );

  const Controls = ({ position }: { position?: string }) => (
    <div data-testid="controls" data-position={position} />
  );

  const MiniMap = ({
    className,
    pannable,
    zoomable,
  }: {
    className?: string;
    pannable?: boolean;
    zoomable?: boolean;
  }) => (
    <div
      data-testid="minimap"
      className={className}
      data-pannable={String(pannable)}
      data-zoomable={String(zoomable)}
    />
  );

  return {
    ReactFlow,
    Background,
    BackgroundVariant: { Dots: 'dots', Lines: 'lines', Cross: 'cross' },
    Controls,
    MiniMap,
  };
});

describe('FlowCanvas', () => {
  it('renders the outer container div', () => {
    const { container } = render(<FlowCanvas />);
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it('renders ReactFlow inside', () => {
    const { getByTestId } = render(<FlowCanvas />);
    expect(getByTestId('react-flow')).toBeTruthy();
  });

  it('applies containerClassName to the wrapper div', () => {
    const { container } = render(<FlowCanvas containerClassName="my-canvas-wrapper" />);
    expect((container.firstChild as HTMLElement).className).toContain('my-canvas-wrapper');
  });

  it('applies className to ReactFlow element', () => {
    const { getByTestId } = render(<FlowCanvas className="rf-custom" />);
    expect(getByTestId('react-flow').className).toContain('rf-custom');
  });

  describe('showBackground', () => {
    it('renders Background when showBackground is true (default)', () => {
      const { getByTestId } = render(<FlowCanvas />);
      expect(getByTestId('background')).toBeTruthy();
    });

    it('does not render Background when showBackground is false', () => {
      const { queryByTestId } = render(<FlowCanvas showBackground={false} />);
      expect(queryByTestId('background')).toBeNull();
    });

    it('passes backgroundProps to Background', () => {
      const { getByTestId } = render(<FlowCanvas backgroundProps={{ gap: 40, size: 2 }} />);
      expect(getByTestId('background').getAttribute('data-gap')).toBe('40');
      expect(getByTestId('background').getAttribute('data-size')).toBe('2');
    });
  });

  describe('showControls', () => {
    it('renders Controls when showControls is true (default)', () => {
      const { getByTestId } = render(<FlowCanvas />);
      expect(getByTestId('controls')).toBeTruthy();
    });

    it('does not render Controls when showControls is false', () => {
      const { queryByTestId } = render(<FlowCanvas showControls={false} />);
      expect(queryByTestId('controls')).toBeNull();
    });

    it('renders Controls with default position bottom-right', () => {
      const { getByTestId } = render(<FlowCanvas />);
      expect(getByTestId('controls').getAttribute('data-position')).toBe('bottom-right');
    });
  });

  describe('showMiniMap', () => {
    it('renders MiniMap when showMiniMap is true (default)', () => {
      const { getByTestId } = render(<FlowCanvas />);
      expect(getByTestId('minimap')).toBeTruthy();
    });

    it('does not render MiniMap when showMiniMap is false', () => {
      const { queryByTestId } = render(<FlowCanvas showMiniMap={false} />);
      expect(queryByTestId('minimap')).toBeNull();
    });

    it('MiniMap is pannable and zoomable by default', () => {
      const { getByTestId } = render(<FlowCanvas />);
      const mm = getByTestId('minimap');
      expect(mm.getAttribute('data-pannable')).toBe('true');
      expect(mm.getAttribute('data-zoomable')).toBe('true');
    });

    it('merges miniMapProps className with hidden/md:block', () => {
      const { getByTestId } = render(<FlowCanvas miniMapProps={{ className: 'custom-minimap' }} />);
      const mm = getByTestId('minimap');
      expect(mm.className).toContain('hidden');
      expect(mm.className).toContain('custom-minimap');
    });
  });

  it('renders children inside ReactFlow', () => {
    const { getByText } = render(
      <FlowCanvas>
        <span>Custom child</span>
      </FlowCanvas>
    );
    expect(getByText('Custom child')).toBeTruthy();
  });

  it('fitView is true by default', () => {
    const { getByTestId } = render(<FlowCanvas />);
    expect(getByTestId('react-flow').getAttribute('data-fit-view')).toBe('true');
  });

  it('hides attribution by default via proOptions', () => {
    const { getByTestId } = render(<FlowCanvas />);
    expect(getByTestId('react-flow').getAttribute('data-hide-attribution')).toBe('true');
  });
});
