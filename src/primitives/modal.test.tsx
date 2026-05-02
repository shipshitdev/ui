import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal, ModalFooter } from './modal';

vi.mock('./dialog', async () => {
  const React = await import('react');
  const DialogContext = React.createContext<((open: boolean) => void) | undefined>(undefined);

  function Dialog({
    open,
    onOpenChange,
    children,
  }: {
    open: boolean;
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
  }) {
    if (!open) return null;

    return <DialogContext.Provider value={onOpenChange}>{children}</DialogContext.Provider>;
  }

  function DialogClose({
    children,
    onClick,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const onOpenChange = React.useContext(DialogContext);

    return (
      <button
        type="button"
        onClick={(event) => {
          onClick?.(event);
          onOpenChange?.(false);
        }}
        {...props}
      >
        {children}
      </button>
    );
  }

  return {
    Dialog,
    DialogClose,
    DialogContent: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div role="dialog" {...props}>
        {children}
      </div>
    ),
    DialogFooter: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
    DialogHeader: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
    DialogTitle: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2 {...props}>{children}</h2>
    ),
  };
});

describe('Modal', () => {
  it('renders title when open', () => {
    const { getByText } = render(
      <Modal open onClose={vi.fn()} title="My Modal">
        <p>Content</p>
      </Modal>
    );
    expect(getByText('My Modal')).toBeTruthy();
  });

  it('renders children when open', () => {
    const { getByText } = render(
      <Modal open onClose={vi.fn()} title="Title">
        <p>Modal body content</p>
      </Modal>
    );
    expect(getByText('Modal body content')).toBeTruthy();
  });

  it('does not render content when closed', () => {
    const { queryByText } = render(
      <Modal open={false} onClose={vi.fn()} title="Hidden Modal">
        <p>Hidden content</p>
      </Modal>
    );
    expect(queryByText('Hidden Modal')).toBeNull();
    expect(queryByText('Hidden content')).toBeNull();
  });

  it('renders a close button with correct aria-label', () => {
    const { getByLabelText } = render(
      <Modal open onClose={vi.fn()} title="Title">
        <p>Content</p>
      </Modal>
    );
    expect(getByLabelText('Close')).toBeTruthy();
  });

  it('calls onClose when the close button is clicked', async () => {
    const onClose = vi.fn();
    const { getByLabelText } = render(
      <Modal open onClose={onClose} title="Title">
        <p>Content</p>
      </Modal>
    );
    await userEvent.click(getByLabelText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders headerAction when provided', () => {
    const { getByTestId } = render(
      <Modal
        open
        onClose={vi.fn()}
        title="Title"
        headerAction={
          <button type="button" data-testid="header-btn">
            Action
          </button>
        }
      >
        <p>Content</p>
      </Modal>
    );
    expect(getByTestId('header-btn')).toBeTruthy();
  });

  it('does not render headerAction area when not provided', () => {
    const { queryByTestId } = render(
      <Modal open onClose={vi.fn()} title="Title">
        <p>Content</p>
      </Modal>
    );
    expect(queryByTestId('header-btn')).toBeNull();
  });

  it('applies custom className to the dialog content', () => {
    const { baseElement } = render(
      <Modal open onClose={vi.fn()} title="Title" className="max-w-[720px]">
        <p>Content</p>
      </Modal>
    );
    expect(baseElement.querySelector('.max-w-\\[720px\\]')).toBeTruthy();
  });

  it('applies custom headerClassName', () => {
    const { baseElement } = render(
      <Modal open onClose={vi.fn()} title="Title" headerClassName="custom-header">
        <p>Content</p>
      </Modal>
    );
    expect(baseElement.querySelector('.custom-header')).toBeTruthy();
  });

  it('calls onKeyDown handler when key is pressed', async () => {
    const onKeyDown = vi.fn();
    render(
      <Modal open onClose={vi.fn()} title="Title" onKeyDown={onKeyDown}>
        <p data-testid="modal-child">Content</p>
      </Modal>
    );
    // onKeyDown is on DialogContent which wraps the dialog role element
    const dialog = document.querySelector('[role="dialog"]') as HTMLElement;
    // Fire on the dialog or its parent — Radix may nest elements
    const target = dialog?.closest('[data-state]') ?? dialog;
    if (target) {
      fireEvent.keyDown(target, { key: 'a' });
    }
    // If Radix intercepts Escape, use a non-special key
    // The handler may be on the content wrapper, not the role=dialog element
    if (!onKeyDown.mock.calls.length && dialog) {
      // Try the parent element which is DialogContent
      fireEvent.keyDown(dialog.parentElement ?? dialog, { key: 'a' });
    }
    expect(onKeyDown).toHaveBeenCalled();
  });

  it('renders ReactNode as title', () => {
    const { getByTestId, getByText } = render(
      <Modal
        open
        onClose={vi.fn()}
        title={<span data-testid="custom-title">Custom Title Node</span>}
      >
        <p>Content</p>
      </Modal>
    );
    expect(getByTestId('custom-title')).toBeTruthy();
    expect(getByText('Custom Title Node')).toBeTruthy();
  });

  it('close button has title="Close"', () => {
    const { getByLabelText } = render(
      <Modal open onClose={vi.fn()} title="Title">
        <p>Content</p>
      </Modal>
    );
    const closeBtn = getByLabelText('Close');
    expect(closeBtn.getAttribute('title')).toBe('Close');
  });
});

describe('ModalFooter', () => {
  it('exports ModalFooter as DialogFooter alias', () => {
    expect(ModalFooter).toBeTruthy();
  });

  it('renders ModalFooter with children', () => {
    const { getByText } = render(
      <ModalFooter>
        <button type="button">Cancel</button>
        <button type="button">Confirm</button>
      </ModalFooter>
    );
    expect(getByText('Cancel')).toBeTruthy();
    expect(getByText('Confirm')).toBeTruthy();
  });

  it('applies custom className to ModalFooter', () => {
    const { container } = render(
      <ModalFooter className="footer-class">
        <button type="button">OK</button>
      </ModalFooter>
    );
    expect(container.querySelector('.footer-class')).toBeTruthy();
  });
});
