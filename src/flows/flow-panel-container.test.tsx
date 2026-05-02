import { render, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { FlowPanelContainer } from './flow-panel-container';

describe('FlowPanelContainer', () => {
  it('renders children', () => {
    const { getByText } = render(
      <FlowPanelContainer>
        <span>Panel content</span>
      </FlowPanelContainer>
    );
    expect(getByText('Panel content')).toBeTruthy();
  });

  it('renders as a div', () => {
    const { container } = render(<FlowPanelContainer>child</FlowPanelContainer>);
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it('applies className', () => {
    const { container } = render(
      <FlowPanelContainer className="my-panel">child</FlowPanelContainer>
    );
    expect((container.firstChild as HTMLElement).className).toContain('my-panel');
  });

  it('forwards ref to the underlying div', () => {
    const ref = createRef<HTMLDivElement>();
    render(<FlowPanelContainer ref={ref}>child</FlowPanelContainer>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('stops propagation of mousedown via capture', () => {
    const outerHandler = vi.fn();
    const { container } = render(
      // biome-ignore lint/a11y/noStaticElementInteractions: testing event propagation
      <div onMouseDown={outerHandler}>
        <FlowPanelContainer>
          <button type="button">Click</button>
        </FlowPanelContainer>
      </div>
    );
    const button = container.querySelector('button') as HTMLButtonElement;
    fireEvent.mouseDown(button);
    // stopPropagation is called in capture phase — outer div onMouseDown should not fire
    expect(outerHandler).not.toHaveBeenCalled();
  });

  it('stops propagation of pointerdown via capture', () => {
    const outerHandler = vi.fn();
    const { container } = render(
      <div onPointerDown={outerHandler}>
        <FlowPanelContainer>
          <button type="button">Click</button>
        </FlowPanelContainer>
      </div>
    );
    const button = container.querySelector('button') as HTMLButtonElement;
    fireEvent.pointerDown(button);
    expect(outerHandler).not.toHaveBeenCalled();
  });

  it('stops propagation of dblclick via capture', () => {
    const outerHandler = vi.fn();
    const { container } = render(
      // biome-ignore lint/a11y/noStaticElementInteractions: testing event propagation
      <div onDoubleClick={outerHandler}>
        <FlowPanelContainer>
          <button type="button">Click</button>
        </FlowPanelContainer>
      </div>
    );
    const button = container.querySelector('button') as HTMLButtonElement;
    fireEvent.doubleClick(button);
    expect(outerHandler).not.toHaveBeenCalled();
  });

  it('passes additional HTML props to the div', () => {
    const { container } = render(
      <FlowPanelContainer data-testid="panel" aria-label="flow panel">
        child
      </FlowPanelContainer>
    );
    const div = container.firstChild as HTMLElement;
    expect(div.getAttribute('data-testid')).toBe('panel');
    expect(div.getAttribute('aria-label')).toBe('flow panel');
  });

  it('has correct displayName', () => {
    expect(FlowPanelContainer.displayName).toBe('FlowPanelContainer');
  });
});
