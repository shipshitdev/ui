import { describe, expect, it } from 'bun:test';
import { render } from '@testing-library/react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './Accordion';

describe('Accordion', () => {
  it('renders accordion element', () => {
    const { container } = render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('renders trigger text', () => {
    const { getByText } = render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Test Trigger</AccordionTrigger>
          <AccordionContent>Test Content</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(getByText('Test Trigger')).toBeTruthy();
  });

  it('renders multiple items', () => {
    const { getByText } = render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>First</AccordionTrigger>
          <AccordionContent>First Content</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Second</AccordionTrigger>
          <AccordionContent>Second Content</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(getByText('First')).toBeTruthy();
    expect(getByText('Second')).toBeTruthy();
  });

  it('applies default variant to item', () => {
    const { container } = render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(container.querySelector('.border-border')).toBeTruthy();
  });

  it('applies bordered variant to item', () => {
    const { container } = render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" variant="bordered">
          <AccordionTrigger>Trigger</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(container.querySelector('.border-x')).toBeTruthy();
  });

  it('applies custom className to item', () => {
    const { container } = render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="custom-class">
          <AccordionTrigger>Trigger</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(container.querySelector('.custom-class')).toBeTruthy();
  });

  it('applies custom className to trigger', () => {
    const { getByRole } = render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="trigger-class">Trigger</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(getByRole('button').className).toContain('trigger-class');
  });

  it('supports multiple type', () => {
    const { getAllByRole } = render(
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>First</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Second</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(getAllByRole('button').length).toBe(2);
  });

  it('forwards ref to item', () => {
    const ref = { current: null };
    render(
      <Accordion type="single" collapsible>
        <AccordionItem ref={ref} value="item-1">
          <AccordionTrigger>Trigger</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(ref.current).toBeTruthy();
  });

  it('forwards ref to trigger', () => {
    const ref = { current: null };
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger ref={ref}>Trigger</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
