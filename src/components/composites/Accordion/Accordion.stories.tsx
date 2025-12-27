import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Composites/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[450px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern and includes proper
          ARIA attributes, supports keyboard navigation, and has been tested
          with screen readers.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it unstyled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes unstyled by default, giving you complete control over
          styling without fighting specificity wars.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Can it be animated?</AccordionTrigger>
        <AccordionContent>
          Yes. You can use CSS animations or JavaScript animation libraries. The
          component exposes data attributes to help target different states.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-[450px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>First Item</AccordionTrigger>
        <AccordionContent>
          This is the content for the first accordion item. Multiple items can
          be open at the same time.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second Item</AccordionTrigger>
        <AccordionContent>
          This is the content for the second accordion item.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Third Item</AccordionTrigger>
        <AccordionContent>
          This is the content for the third accordion item.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Bordered: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[450px]">
      <AccordionItem value="item-1" variant="bordered">
        <AccordionTrigger>Bordered Item</AccordionTrigger>
        <AccordionContent>
          This accordion item has a border variant for better visual separation.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" variant="bordered">
        <AccordionTrigger>Another Bordered Item</AccordionTrigger>
        <AccordionContent>
          All items in this accordion use the bordered variant.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Ghost: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[450px]">
      <AccordionItem value="item-1" variant="ghost">
        <AccordionTrigger>Ghost Item</AccordionTrigger>
        <AccordionContent>
          This accordion item has no visible borders, creating a cleaner look.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" variant="ghost">
        <AccordionTrigger>Another Ghost Item</AccordionTrigger>
        <AccordionContent>
          Ghost variant items blend seamlessly with the background.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const FAQ: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[600px]">
      <AccordionItem value="faq-1">
        <AccordionTrigger>What is this component library?</AccordionTrigger>
        <AccordionContent>
          This is a modern React component library built with TypeScript,
          Tailwind CSS v4, Radix UI, and shadcn/ui patterns. It provides
          accessible, customizable components for building web applications.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-2">
        <AccordionTrigger>How do I install it?</AccordionTrigger>
        <AccordionContent>
          You can install it using your preferred package manager. For example,
          with bun: <code>bun add @agenticindiedev/ui</code>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-3">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes! All components are built with accessibility in mind, using Radix
          UI primitives that follow WAI-ARIA guidelines and support keyboard
          navigation and screen readers.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-4">
        <AccordionTrigger>Can I customize the styling?</AccordionTrigger>
        <AccordionContent>
          Absolutely! Components use CSS variables for theming, and you can
          customize colors, spacing, and other design tokens. All components
          accept className props for additional styling.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
