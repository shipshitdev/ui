# Architecture - @shipshitdev/ui

**Purpose:** Document what IS implemented (not what WILL BE).
**Last Updated:** 2025-12-23

---

## Overview

@shipshitdev/ui is a React component library providing reusable UI components for the shipshitdev ecosystem. Components are designed to be:

- Framework-agnostic (works with Next.js, Vite, etc.)
- Fully typed with TypeScript
- Styled with Tailwind CSS
- Accessible by default
- Documented with Storybook

---

## Tech Stack

| Technology               | Version | Purpose                   |
| ------------------------ | ------- | ------------------------- |
| Bun                      | 1.x     | Package manager & runtime |
| React                    | 19.x    | Component framework       |
| TypeScript               | 5.x     | Type safety               |
| Tailwind CSS             | 4.x     | Styling                   |
| Vite                     | 7.x     | Build tool                |
| Storybook                | 10.x    | Component documentation   |
| class-variance-authority | latest  | Variant management        |

---

## Project Structure

```
ui/
├── .agent/                  # AI agent documentation
├── .storybook/              # Storybook configuration
├── src/
│   ├── components/
│   │   ├── primitives/      # Base components
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Text/
│   │   │   └── ...
│   │   ├── composites/      # Composed components
│   │   │   ├── Card/
│   │   │   ├── SearchBar/
│   │   │   └── ...
│   │   ├── layouts/         # Layout components
│   │   │   ├── Container/
│   │   │   ├── Stack/
│   │   │   └── ...
│   │   └── patterns/        # Complex patterns
│   │       ├── DataTable/
│   │       └── ...
│   ├── hooks/               # Shared React hooks
│   ├── utils/               # Utility functions
│   │   └── cn.ts            # Class name utility
│   ├── tokens/              # Design tokens
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   └── typography.ts
│   └── index.ts             # Main export
├── docs/                    # Documentation site (Next.js)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── vite.config.ts           # Build configuration
```

---

## Component Categories

### Primitives

Base building blocks that don't depend on other components:

- **Button** - Clickable actions
- **Input** - Text input fields
- **Text** - Typography component
- **Icon** - Icon wrapper
- **Badge** - Status indicators

### Composites

Built from primitives:

- **Card** - Content container with header/body/footer
- **SearchBar** - Input + button + dropdown
- **FormField** - Label + input + error message

### Layouts

Structure and spacing:

- **Container** - Max-width wrapper
- **Stack** - Vertical/horizontal stacking
- **Grid** - CSS Grid wrapper

### Patterns

Complex, reusable patterns:

- **DataTable** - Sortable, filterable tables
- **Modal** - Dialog overlay
- **Toast** - Notification system

---

## Design Tokens

Design tokens are defined in `src/tokens/` and integrated with Tailwind:

```typescript
// tokens/colors.ts
export const colors = {
  primary: {
    50: '#f0f9ff',
    500: '#0ea5e9',
    900: '#0c4a6e',
  },
  // ...
};
```

---

## Build & Distribution

The library is built with Vite for optimal tree-shaking:

```
dist/
├── index.js           # ESM bundle
├── index.cjs          # CommonJS bundle
├── index.d.ts         # TypeScript declarations
└── styles.css         # Compiled Tailwind styles
```

Consumers can import:

```typescript
import { Button, Card } from '@shipshitdev/ui';
import '@shipshitdev/ui/styles.css';
```

---

## Related Documentation

- `RULES.md` - Coding standards
- `architecture/DECISIONS.md` - Architectural decisions
- `architecture/PROJECT-MAP.md` - Project map
- `quality/SECURITY-CHECKLIST.md` - Security considerations
