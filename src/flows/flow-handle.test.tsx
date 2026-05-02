import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FlowHandle, flowHandleVariants, type FlowHandleTone } from './flow-handle';

vi.mock('@xyflow/react', () => ({
  Handle: ({
    className,
    type,
    position,
    ...rest
  }: {
    className?: string;
    type?: string;
    position?: string;
    [key: string]: unknown;
  }) => (
    <div
      data-testid="handle"
      data-type={type}
      data-position={position}
      className={className}
      {...(rest as Record<string, unknown>)}
    />
  ),
  Position: {
    Left: 'left',
    Right: 'right',
    Top: 'top',
    Bottom: 'bottom',
  },
}));

describe('FlowHandle', () => {
  const baseProps = {
    type: 'source' as const,
    position: 'right' as Parameters<typeof FlowHandle>[0]['position'],
  };

  it('renders the underlying Handle', () => {
    const { getByTestId } = render(<FlowHandle {...baseProps} />);
    expect(getByTestId('handle')).toBeTruthy();
  });

  it('passes type and position to Handle', () => {
    const { getByTestId } = render(
      <FlowHandle type="target" position={'left' as Parameters<typeof FlowHandle>[0]['position']} />
    );
    const el = getByTestId('handle');
    expect(el.getAttribute('data-type')).toBe('target');
    expect(el.getAttribute('data-position')).toBe('left');
  });

  it('applies default variant classes when no tone/size provided', () => {
    const { getByTestId } = render(<FlowHandle {...baseProps} />);
    const el = getByTestId('handle');
    expect(el.className).toContain('flow-handle');
    expect(el.className).toContain('flow-handle-default');
    // default size = h-3 w-3
    expect(el.className).toContain('h-3');
    expect(el.className).toContain('w-3');
  });

  describe('tone variants', () => {
    const tones: FlowHandleTone[] = [
      'default',
      'image',
      'video',
      'text',
      'number',
      'audio',
      'success',
      'warning',
      'danger',
      'info',
      'accent',
    ];

    for (const tone of tones) {
      it(`applies tone class for "${tone}"`, () => {
        const { getByTestId } = render(<FlowHandle {...baseProps} tone={tone} />);
        expect(getByTestId('handle').className).toContain(`flow-handle-${tone}`);
      });
    }
  });

  describe('size variants', () => {
    it('applies sm size classes', () => {
      const { getByTestId } = render(<FlowHandle {...baseProps} size="sm" />);
      const el = getByTestId('handle');
      expect(el.className).toContain('h-2.5');
      expect(el.className).toContain('w-2.5');
    });

    it('applies default size classes', () => {
      const { getByTestId } = render(<FlowHandle {...baseProps} size="default" />);
      const el = getByTestId('handle');
      expect(el.className).toContain('h-3');
      expect(el.className).toContain('w-3');
    });

    it('applies lg size classes', () => {
      const { getByTestId } = render(<FlowHandle {...baseProps} size="lg" />);
      const el = getByTestId('handle');
      expect(el.className).toContain('h-3.5');
      expect(el.className).toContain('w-3.5');
    });
  });

  it('merges custom className', () => {
    const { getByTestId } = render(<FlowHandle {...baseProps} className="my-custom-handle" />);
    expect(getByTestId('handle').className).toContain('my-custom-handle');
  });

  it('always includes base flow-handle class', () => {
    const { getByTestId } = render(<FlowHandle {...baseProps} tone="accent" size="lg" />);
    expect(getByTestId('handle').className).toContain('flow-handle');
    expect(getByTestId('handle').className).toContain('border');
  });
});

describe('flowHandleVariants', () => {
  it('generates class string for tone=text size=sm', () => {
    const cls = flowHandleVariants({ tone: 'text', size: 'sm' });
    expect(cls).toContain('flow-handle-text');
    expect(cls).toContain('h-2.5');
  });

  it('uses defaults when no args provided', () => {
    const cls = flowHandleVariants();
    expect(cls).toContain('flow-handle-default');
    expect(cls).toContain('h-3');
  });
});
