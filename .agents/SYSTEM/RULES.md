# Coding Rules - Ship Shit Dev

**Purpose:** Coding standards and patterns for this project.
**Last Updated:** 2025-12-23

---

## General Principles

1. **Follow existing patterns** - Search for 3+ similar implementations before writing new code
2. **Quality over speed** - Think through implementations before coding
3. **No inline types** - Define interfaces/types in dedicated files
4. **No `any` types** - Use proper TypeScript types
5. **No `console.log`** - Use a logging service

---

## File Organization

### Naming Conventions

- **Directories:** lowercase with hyphens (`user-settings/`)
- **Files:** kebab-case (`user-service.ts`)
- **Components:** PascalCase (`UserProfile.tsx`)
- **Interfaces:** PascalCase with `I` prefix (`IUserProfile`)

### Import Order

1. External packages
2. Internal packages/aliases
3. Relative imports
4. Types/interfaces

```typescript
// External
import { useState } from 'react';

// Internal aliases
import { Button } from '@components/ui';
import { UserService } from '@services/user';

// Relative
import { helpers } from './utils';

// Types
import type { IUser } from '@interfaces/user';
```

---

## TypeScript

### Do

- Use strict mode
- Define return types for functions
- Use path aliases (`@components/`, `@services/`)
- Export types from dedicated files

### Don't

- Use `any` type
- Use inline interface definitions
- Use relative imports for shared code
- Ignore TypeScript errors

---

## Error Handling

```typescript
try {
  const result = await operation();
  return result;
} catch (error) {
  logger.error('Operation failed', { error, context });
  throw new AppError('User-friendly message', error);
}
```

---

## Testing

- Write tests for business logic
- Use descriptive test names
- Mock external dependencies
- Test edge cases

---

## Git

### Commit Messages

```
type(scope): description

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Branch Naming

- `feature/description`
- `fix/description`
- `chore/description`

---

## Documentation

- Document public APIs
- Add JSDoc for complex functions
- Keep README up to date
- Document architectural decisions in `SYSTEM/architecture/DECISIONS.md`

---

## Project-Specific Rules: UI Component Library

### Component Structure

Every component MUST follow this structure:

```
components/
├── primitives/          # Base building blocks (Button, Input, Text)
├── composites/          # Composed from primitives (SearchBar, Card)
├── layouts/             # Layout components (Container, Grid, Stack)
└── patterns/            # Complex patterns (DataTable, Modal)
```

### Component File Organization

Each component lives in its own folder:

```
Button/
├── Button.tsx           # Main component
├── Button.types.ts      # TypeScript interfaces
├── Button.stories.tsx   # Storybook stories (required)
├── Button.test.tsx      # Unit tests (required)
├── index.ts             # Barrel export
└── variants/            # (optional) subcomponents
```

### Component Props Pattern

```typescript
// Button.types.ts
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
```

### Styling with Tailwind

- Use Tailwind classes exclusively (no inline styles)
- Use `cn()` utility for conditional classes (from class-variance-authority)
- Define variants using `cva()`:

```typescript
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
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
```

### Accessibility Requirements

- All interactive elements MUST be keyboard accessible
- Include proper ARIA attributes
- Support `disabled` and `loading` states
- Test with screen readers
- Use semantic HTML elements

### Export Pattern

```typescript
// components/index.ts
export { Button } from './primitives/Button';
export type { ButtonProps } from './primitives/Button';
```

### Storybook Documentation

Every component requires:

- Default story
- All variant combinations
- Interactive controls
- Usage guidelines in MDX

---

**Remember:** When in doubt, check existing code for patterns.
