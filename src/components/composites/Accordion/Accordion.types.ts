import type * as AccordionPrimitive from '@radix-ui/react-accordion';
import type { VariantProps } from 'class-variance-authority';
import type { accordionItemVariants } from './Accordion';

export type AccordionProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>;

export interface AccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>,
    VariantProps<typeof accordionItemVariants> {}

export interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof import('@radix-ui/react-accordion').Trigger> {}

export interface AccordionContentProps
  extends React.ComponentPropsWithoutRef<typeof import('@radix-ui/react-accordion').Content> {}
