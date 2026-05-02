# SOP: Create New Component

**Purpose:** Step-by-step guide for adding a new component to the library
**Last Updated:** 2025-12-23

## Overview

This SOP covers the complete process for creating a new UI component, from initial setup to documentation.

## Prerequisites

- Bun installed
- Project dependencies installed (`bun install`)
- Understanding of component category (primitive, composite, layout, pattern)

## Steps

### 1. Determine Component Category

| Category      | When to Use                                    | Example                |
| ------------- | ---------------------------------------------- | ---------------------- |
| `primitives/` | Base building block, no component dependencies | Button, Input, Text    |
| `composites/` | Combines 2+ primitives                         | Card, SearchBar        |
| `layouts/`    | Handles spacing/positioning                    | Stack, Grid, Container |
| `patterns/`   | Complex, stateful UI patterns                  | Modal, DataTable       |

### 2. Create Component Folder Structure

```bash
# Example: Creating a Button component
mkdir -p src/components/primitives/Button
cd src/components/primitives/Button
touch Button.tsx Button.types.ts Button.stories.tsx Button.test.tsx index.ts
```

Required files:

- `ComponentName.tsx` - Main component
- `ComponentName.types.ts` - TypeScript interfaces
- `ComponentName.stories.tsx` - Storybook documentation
- `ComponentName.test.tsx` - Unit tests
- `index.ts` - Barrel export

### 3. Define Types First

```typescript
// Button.types.ts
import { VariantProps } from 'class-variance-authority';
import { buttonVariants } from './Button';

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}
```

### 4. Implement Component

```typescript
// Button.tsx
import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import type { ButtonProps } from './Button.types';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-white hover:bg-primary-600',
        secondary: 'bg-secondary-100 text-secondary-900 hover:bg-secondary-200',
        ghost: 'hover:bg-gray-100',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? <Spinner /> : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### 5. Create Barrel Export

```typescript
// index.ts
export { Button, buttonVariants } from './Button';
export type { ButtonProps } from './Button.types';
```

### 6. Write Storybook Stories

```typescript
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    children: 'Loading',
    isLoading: true,
  },
};
```

### 7. Write Tests

```typescript
// Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('handles click events', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when loading', () => {
    render(<Button isLoading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies variant classes', () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-secondary-100');
  });
});
```

### 8. Add to Main Export

```typescript
// src/components/index.ts
export { Button } from './primitives/Button';
export type { ButtonProps } from './primitives/Button';
```

### 9. Update Documentation

Add component to the category list in `.agents/SYSTEM/ARCHITECTURE.md`.

## Verification Checklist

- [ ] Component renders correctly
- [ ] All variants work as expected
- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] Tests pass (`bun test`)
- [ ] Storybook stories display correctly
- [ ] Types are exported
- [ ] No TypeScript errors

## Common Issues

### Issue: Tailwind classes not applying

**Problem:** Custom classes aren't showing up in the browser
**Solution:** Ensure `src/components/**/*.tsx` is in Tailwind's content config

### Issue: forwardRef TypeScript errors

**Problem:** Generic types not working with forwardRef
**Solution:** Use the pattern shown above with explicit generic parameters

### Issue: CVA variants not type-safe

**Problem:** Variant props not showing in IntelliSense
**Solution:** Extend `VariantProps<typeof componentVariants>` in your props interface

## Related

- `SYSTEM/RULES.md` - Coding standards
- `SYSTEM/ARCHITECTURE.md` - Component categories
- `SYSTEM/critical/CRITICAL-NEVER-DO.md` - What to avoid
