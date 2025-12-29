import { describe, expect, it } from 'bun:test';
import { render } from '@testing-library/react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from './Dialog';

describe('Dialog', () => {
  it('renders dialog trigger', () => {
    const { getByRole } = render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>
    );
    expect(getByRole('button')).toBeTruthy();
  });

  it('renders trigger text', () => {
    const { getByText } = render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>
    );
    expect(getByText('Open Dialog')).toBeTruthy();
  });

  it('exports all dialog components', () => {
    expect(Dialog).toBeTruthy();
    expect(DialogTrigger).toBeTruthy();
    expect(DialogContent).toBeTruthy();
    expect(DialogTitle).toBeTruthy();
    expect(DialogDescription).toBeTruthy();
    expect(DialogHeader).toBeTruthy();
    expect(DialogFooter).toBeTruthy();
    expect(DialogClose).toBeTruthy();
    expect(DialogOverlay).toBeTruthy();
    expect(DialogPortal).toBeTruthy();
  });

  it('renders dialog header with custom className', () => {
    const { container } = render(
      <DialogHeader className="header-class">
        <span>Header Content</span>
      </DialogHeader>
    );
    expect(container.querySelector('.header-class')).toBeTruthy();
  });

  it('renders dialog footer with custom className', () => {
    const { container } = render(
      <DialogFooter className="footer-class">
        <span>Footer Content</span>
      </DialogFooter>
    );
    expect(container.querySelector('.footer-class')).toBeTruthy();
  });

  it('applies custom className to trigger', () => {
    const { getByRole } = render(
      <Dialog>
        <DialogTrigger className="trigger-class">Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>
    );
    expect(getByRole('button').className).toContain('trigger-class');
  });

  it('header has correct layout classes', () => {
    const { container } = render(
      <DialogHeader>
        <span>Content</span>
      </DialogHeader>
    );
    expect(container.querySelector('.flex-col')).toBeTruthy();
  });

  it('footer has correct layout classes', () => {
    const { container } = render(
      <DialogFooter>
        <span>Content</span>
      </DialogFooter>
    );
    expect(container.querySelector('.flex-col-reverse')).toBeTruthy();
  });

  // Coverage for DialogOverlay (lines 17-23)
  it('renders DialogOverlay with custom className', () => {
    render(
      <Dialog open>
        <DialogPortal>
          <DialogOverlay className="custom-overlay" />
        </DialogPortal>
      </Dialog>
    );
    expect(document.querySelector('.custom-overlay')).toBeTruthy();
  });

  it('forwards ref to DialogOverlay', () => {
    const ref = { current: null };
    render(
      <Dialog open>
        <DialogPortal>
          <DialogOverlay ref={ref} />
        </DialogPortal>
      </Dialog>
    );
    expect(ref.current).toBeTruthy();
  });

  // Coverage for DialogTitle (lines 84-90)
  it('renders DialogTitle standalone', () => {
    const { getByText } = render(
      <Dialog open>
        <DialogPortal>
          <DialogTitle>Test Title</DialogTitle>
        </DialogPortal>
      </Dialog>
    );
    expect(getByText('Test Title')).toBeTruthy();
  });

  it('applies custom className to DialogTitle', () => {
    render(
      <Dialog open>
        <DialogPortal>
          <DialogTitle className="title-class">Title</DialogTitle>
        </DialogPortal>
      </Dialog>
    );
    expect(document.querySelector('.title-class')).toBeTruthy();
  });

  it('forwards ref to DialogTitle', () => {
    const ref = { current: null };
    render(
      <Dialog open>
        <DialogPortal>
          <DialogTitle ref={ref}>Title</DialogTitle>
        </DialogPortal>
      </Dialog>
    );
    expect(ref.current).toBeTruthy();
  });

  // Coverage for DialogDescription (lines 99-102)
  it('renders DialogDescription standalone', () => {
    const { getByText } = render(
      <Dialog open>
        <DialogPortal>
          <DialogDescription>Test Description</DialogDescription>
        </DialogPortal>
      </Dialog>
    );
    expect(getByText('Test Description')).toBeTruthy();
  });

  it('applies custom className to DialogDescription', () => {
    render(
      <Dialog open>
        <DialogPortal>
          <DialogDescription className="desc-class">Desc</DialogDescription>
        </DialogPortal>
      </Dialog>
    );
    expect(document.querySelector('.desc-class')).toBeTruthy();
  });

  it('forwards ref to DialogDescription', () => {
    const ref = { current: null };
    render(
      <Dialog open>
        <DialogPortal>
          <DialogDescription ref={ref}>Description</DialogDescription>
        </DialogPortal>
      </Dialog>
    );
    expect(ref.current).toBeTruthy();
  });
});
