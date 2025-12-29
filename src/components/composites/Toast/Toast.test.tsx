import { describe, expect, it } from 'bun:test';
import { render } from '@testing-library/react';
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './Toast';

describe('Toast', () => {
  it('renders toast provider', () => {
    const { container } = render(
      <ToastProvider>
        <div>Content</div>
        <ToastViewport />
      </ToastProvider>
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('renders toast viewport', () => {
    const { container } = render(
      <ToastProvider>
        <ToastViewport data-testid="viewport" />
      </ToastProvider>
    );
    expect(container.querySelector('[data-testid="viewport"]')).toBeTruthy();
  });

  it('renders toast with title', () => {
    const { getByText } = render(
      <ToastProvider>
        <Toast open>
          <ToastTitle>Toast Title</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
    expect(getByText('Toast Title')).toBeTruthy();
  });

  it('renders toast with description', () => {
    const { getByText } = render(
      <ToastProvider>
        <Toast open>
          <ToastDescription>Toast description</ToastDescription>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
    expect(getByText('Toast description')).toBeTruthy();
  });

  it('applies default variant', () => {
    const { container } = render(
      <ToastProvider>
        <Toast open>
          <ToastTitle>Title</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
    expect(container.querySelector('.bg-background')).toBeTruthy();
  });

  it('applies success variant', () => {
    const { container } = render(
      <ToastProvider>
        <Toast open variant="success">
          <ToastTitle>Success</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
    expect(container.querySelector('.bg-green-50')).toBeTruthy();
  });

  it('applies error variant', () => {
    const { container } = render(
      <ToastProvider>
        <Toast open variant="error">
          <ToastTitle>Error</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
    expect(container.querySelector('.text-destructive')).toBeTruthy();
  });

  it('applies warning variant', () => {
    const { container } = render(
      <ToastProvider>
        <Toast open variant="warning">
          <ToastTitle>Warning</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
    expect(container.querySelector('.bg-yellow-50')).toBeTruthy();
  });

  it('applies info variant', () => {
    const { container } = render(
      <ToastProvider>
        <Toast open variant="info">
          <ToastTitle>Info</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
    expect(container.querySelector('.text-primary')).toBeTruthy();
  });

  it('applies custom className to toast', () => {
    const { container } = render(
      <ToastProvider>
        <Toast open className="custom-toast">
          <ToastTitle>Title</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
    expect(container.querySelector('.custom-toast')).toBeTruthy();
  });

  it('applies custom className to viewport', () => {
    const { container } = render(
      <ToastProvider>
        <ToastViewport className="custom-viewport" />
      </ToastProvider>
    );
    expect(container.querySelector('.custom-viewport')).toBeTruthy();
  });

  it('forwards ref to toast', () => {
    const ref = { current: null };
    render(
      <ToastProvider>
        <Toast ref={ref} open>
          <ToastTitle>Title</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
    expect(ref.current).toBeTruthy();
  });

  // Coverage for ToastAction (lines 64-70)
  it('renders ToastAction', () => {
    const { getByText } = render(
      <ToastProvider>
        <Toast open>
          <ToastTitle>Title</ToastTitle>
          <ToastAction altText="Undo action">Undo</ToastAction>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
    expect(getByText('Undo')).toBeTruthy();
  });

  it('applies custom className to ToastAction', () => {
    render(
      <ToastProvider>
        <Toast open>
          <ToastTitle>Title</ToastTitle>
          <ToastAction altText="action" className="custom-action">
            Action
          </ToastAction>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
    expect(document.querySelector('.custom-action')).toBeTruthy();
  });

  it('forwards ref to ToastAction', () => {
    const ref = { current: null };
    render(
      <ToastProvider>
        <Toast open>
          <ToastTitle>Title</ToastTitle>
          <ToastAction ref={ref} altText="action">
            Action
          </ToastAction>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
    expect(ref.current).toBeTruthy();
  });

  // Coverage for ToastClose (lines 79-89)
  it('renders ToastClose with X icon', () => {
    render(
      <ToastProvider>
        <Toast open>
          <ToastTitle>Title</ToastTitle>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
    // ToastClose contains an X icon (h-4 w-4)
    expect(document.querySelector('.h-4.w-4')).toBeTruthy();
  });

  it('applies custom className to ToastClose', () => {
    render(
      <ToastProvider>
        <Toast open>
          <ToastTitle>Title</ToastTitle>
          <ToastClose className="custom-close" />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
    expect(document.querySelector('.custom-close')).toBeTruthy();
  });

  it('forwards ref to ToastClose', () => {
    const ref = { current: null };
    render(
      <ToastProvider>
        <Toast open>
          <ToastTitle>Title</ToastTitle>
          <ToastClose ref={ref} />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
    expect(ref.current).toBeTruthy();
  });

  // Coverage for ToastViewport ref forwarding
  it('forwards ref to ToastViewport', () => {
    const ref = { current: null };
    render(
      <ToastProvider>
        <ToastViewport ref={ref} />
      </ToastProvider>
    );
    expect(ref.current).toBeTruthy();
  });

  // Coverage for ToastTitle ref forwarding
  it('forwards ref to ToastTitle', () => {
    const ref = { current: null };
    render(
      <ToastProvider>
        <Toast open>
          <ToastTitle ref={ref}>Title</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
    expect(ref.current).toBeTruthy();
  });

  // Coverage for ToastDescription ref forwarding
  it('forwards ref to ToastDescription', () => {
    const ref = { current: null };
    render(
      <ToastProvider>
        <Toast open>
          <ToastDescription ref={ref}>Description</ToastDescription>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
    expect(ref.current).toBeTruthy();
  });
});
