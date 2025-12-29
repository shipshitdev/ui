# AgenticIndieDevUI

![Status](https://img.shields.io/badge/status-WIP-yellow)
![Version](https://img.shields.io/badge/version-beta-orange)
![Production](https://img.shields.io/badge/production-not%20ready-red)

> ⚠️ **Warning**: This project is currently under active development and is **not ready for production use**. Many features are incomplete, and the codebase is subject to significant changes.

A modern React component library built with TypeScript, Tailwind CSS v4, Radix UI, and shadcn/ui patterns.

📖 **[View Storybook Documentation](https://agenticindiedev.github.io/ui/)**

## Installation

```bash
bun add @agenticindiedev/ui
# or
npm install @agenticindiedev/ui
# or
yarn add @agenticindiedev/ui
```

## Quick Start

Get started in 3 simple steps:

### 1. Add Tailwind Preset

Add the preset to your `tailwind.config.ts`:

```ts
import type { Config } from 'tailwindcss';

export default {
  presets: [require('@agenticindiedev/ui/tailwind.preset')],
  // Your other Tailwind config...
} satisfies Config;
```

### 2. Import Theme CSS

Choose a theme and import it (this replaces the need for `styles.css`):

```tsx
// Light theme (off-white) - includes Tailwind and theme variables
import '@agenticindiedev/ui/themes/light.scss';

// OR Dark theme (gray) - includes Tailwind and theme variables
import '@agenticindiedev/ui/themes/dark.scss';

// Note: Import only ONE theme file, not both styles.css and a theme file
```

### 3. Use Components

```tsx
import { Button, Card, CardHeader, CardContent } from '@agenticindiedev/ui';

function App() {
  return (
    <Card>
      <CardHeader>Welcome</CardHeader>
      <CardContent>
        <Button variant="primary">Click me</Button>
      </CardContent>
    </Card>
  );
}
```

That's it! Your components are ready to use and look great out of the box.

### Theme Switching

You can switch themes programmatically:

```tsx
import { setTheme, getTheme, initTheme } from '@agenticindiedev/ui';

// Initialize theme on app load
initTheme();

// Switch themes
setTheme('dark'); // or 'light'

// Get current theme
const currentTheme = getTheme();
```

## Setup

### 1. Install dependencies

```bash
bun run pre:install
```

This command updates all dependencies to their latest versions and runs the build.

### 2. Development

Start the Storybook development server:

```bash
bun dev
```

This launches Storybook at `http://localhost:6006` where you can preview and develop components.

## Scripts

| Command                   | Description                            |
| ------------------------- | -------------------------------------- |
| `bun dev`                 | Start Storybook development server     |
| `bun run build`           | Build the library for production       |
| `bun run build-storybook` | Build Storybook for deployment         |
| `bun run build:lib`       | Build only the JS/TS bundle            |
| `bun run build:css`       | Build only the CSS bundle              |
| `bun run pre:install`     | Update dependencies and rebuild        |
| `bun run prepare:deploy`  | Format, lint, and build for deployment |
| `bun run format:check`    | Check code formatting                  |
| `bun run format:fix`      | Fix code formatting                    |
| `bun run lint:check`      | Check for linting errors               |
| `bun run lint:fix`        | Fix linting errors                     |
| `bun test`                | Run tests                              |
| `bun run typecheck`       | Run TypeScript type checking           |

## Usage

```tsx
import { Button, Card, CardHeader, CardContent } from '@agenticindiedev/ui';
import '@agenticindiedev/ui/styles.css';

function App() {
  return (
    <Card>
      <CardHeader>Welcome</CardHeader>
      <CardContent>
        <Button variant="primary" size="md">
          Click me
        </Button>
      </CardContent>
    </Card>
  );
}
```

## Customization

The library provides multiple ways to customize components to match your design system. All components accept a `className` prop that merges seamlessly with existing styles.

### Method 1: CSS Variables (Global Theming)

The easiest way to customize colors globally is by overriding CSS variables. This affects all components using those color tokens.

**Example: Customize Button Primary Color**

```css
/* In your global CSS file (e.g., globals.css, app.css) */
:root {
  /* Change primary color to green */
  --primary: 142 76% 36%;
  --primary-foreground: 0 0% 100%;

  /* Or use any color you want */
  --primary: 262 83% 58%; /* Purple */
  --primary: 0 72% 51%; /* Red */
  --primary: 217 91% 60%; /* Blue */
}
```

All buttons with `variant="primary"` will now use your custom color:

```tsx
<Button variant="primary">My Custom Green Button</Button>
```

**Available CSS Variables:**

```css
:root {
  /* Background & Text */
  --background: 0 0% 100%;
  --foreground: 222.2 47.4% 11.2%;

  /* Primary Colors */
  --primary: 199.1 89.1% 48.2%;
  --primary-foreground: 210 40% 98%;

  /* Secondary Colors */
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;

  /* Accent Colors */
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;

  /* Destructive (Error) Colors */
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;

  /* Muted Colors */
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;

  /* Borders & Inputs */
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 199.1 89.1% 48.2%;

  /* Card Colors */
  --card: 0 0% 100%;
  --card-foreground: 222.2 47.4% 11.2%;

  /* Popover Colors */
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 47.4% 11.2%;

  /* Border Radius */
  --radius: 0.5rem;
}
```

### Method 2: Component-Specific Customization (className)

For one-off customizations, use the `className` prop to override styles:

```tsx
<Button
  variant="primary"
  className="bg-purple-500 hover:bg-purple-600 text-white"
>
  Custom Purple Button
</Button>

<Button
  variant="outline"
  className="border-2 border-pink-500 text-pink-600 hover:bg-pink-50"
>
  Custom Pink Outline Button
</Button>
```

### Method 3: Create Custom Theme File

For a complete custom theme, create your own SCSS file:

**For Tailwind CSS v4:**

```scss
/* my-custom-theme.scss */
@use 'tailwindcss';
@use '@agenticindiedev/ui/themes/dark.scss' as *;

:root {
  --primary: 142 76% 36%; /* Your brand green */
  --primary-foreground: 0 0% 100%;
  --secondary: 210 20% 96%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  /* ... define all your colors */
  --radius: 0.75rem; /* Custom border radius */
}

@theme {
  /* Map your custom variables to Tailwind */
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  /* ... map all your custom variables ... */
}

@keyframes accordion-down {
  from {
    height: 0;
  }
  to {
    height: var(--radix-accordion-content-height);
  }
}

@keyframes accordion-up {
  from {
    height: var(--radix-accordion-content-height);
  }
  to {
    height: 0;
  }
}
```

Then import it instead of the default theme:

```tsx
import './my-custom-theme.scss';
```

**For Tailwind CSS v3 (legacy):**

```css
/* my-custom-theme.css */
@import 'tailwindcss';

:root {
  --primary: 142 76% 36%; /* Your brand green */
  --primary-foreground: 0 0% 100%;
  --secondary: 210 20% 96%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  /* ... define all your colors */
  --radius: 0.75rem; /* Custom border radius */
}

@keyframes accordion-down {
  from {
    height: 0;
  }
  to {
    height: var(--radix-accordion-content-height);
  }
}

@keyframes accordion-up {
  from {
    height: var(--radix-accordion-content-height);
  }
  to {
    height: 0;
  }
}
```

Then import it:

```tsx
import './my-custom-theme.css';
```

### Method 4: Tailwind Config Override

You can also extend colors in your `tailwind.config.ts`:

```ts
import type { Config } from 'tailwindcss';

export default {
  presets: [require('@agenticindiedev/ui/tailwind.preset')],
  theme: {
    extend: {
      colors: {
        // Override or extend colors
        primary: {
          DEFAULT: '#10b981', // Your custom green
          foreground: '#ffffff',
        },
      },
    },
  },
} satisfies Config;
```

### Dark Mode Customization

Dark mode is supported via the `dark` class on your HTML element. Customize dark mode colors:

```css
.dark {
  --primary: 142 76% 50%; /* Lighter green for dark mode */
  --background: 222.2 47.4% 11.2%;
  --foreground: 210 40% 98%;
  /* ... */
}
```

### Examples: Button Color Customization

**Change all primary buttons to green:**

```css
:root {
  --primary: 142 76% 36%;
  --primary-foreground: 0 0% 100%;
}
```

**Change a single button:**

```tsx
<Button className="bg-green-500 hover:bg-green-600">Green Button</Button>
```

**Create a custom variant:**

```tsx
<Button
  variant="outline"
  className="border-green-500 text-green-600 hover:bg-green-50"
>
  Green Outline
</Button>
```

## Components

### Primitives

- **Avatar** - User avatar with image and fallback
- **Badge** - Status indicators and labels
- **Button** - Interactive buttons with variants and asChild support
- **Card** - Container component with header, content, and footer
- **Checkbox** - Accessible checkbox with Radix UI
- **Input** - Text input fields with icon support
- **Label** - Form labels
- **Progress** - Progress indicator
- **RadioGroup** - Radio button groups
- **Select** - Accessible dropdown select with Radix UI
- **Separator** - Visual separator
- **Skeleton** - Loading placeholder
- **Slider** - Range slider input
- **Switch** - Toggle switch
- **Textarea** - Multi-line text input

### Composites

- **Alert** - Alert messages with variants
- **Dialog** - Modal dialogs
- **DropdownMenu** - Dropdown menus with submenus
- **Popover** - Popover overlays
- **Table** - Table components (Header, Body, Row, Cell, etc.)
- **Tabs** - Tab navigation
- **Tooltip** - Tooltip overlays

### Patterns

- **DataTable** - Advanced data table with sorting, filtering, pagination, and action buttons

## DataTable Usage

The DataTable component accepts arrays for columns and rows, making it easy to display dynamic data with action buttons:

```tsx
import { DataTable } from '@agenticindiedev/ui';
import { DropdownMenu, DropdownMenuItem } from '@agenticindiedev/ui';
import type { ColumnDef } from '@tanstack/react-table';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">Actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => editUser(user.id)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => deleteUser(user.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const users: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
];

function UsersTable() {
  return (
    <DataTable
      columns={columns}
      data={users}
      searchable
      searchPlaceholder="Search users..."
      pagination
    />
  );
}
```

The DataTable supports:

- **Array-based columns**: Define columns as an array of `ColumnDef` objects
- **Array-based data**: Pass your data as an array
- **Action buttons**: Add action columns with custom cell renderers
- **Search**: Built-in global search functionality
- **Sorting**: Click column headers to sort
- **Pagination**: Automatic pagination controls
- **TypeScript**: Full type safety with generics

## Tech Stack

- **React 19** - UI framework
- **TypeScript 5.9** - Type safety
- **Tailwind CSS 4** - Utility-first CSS
- **Radix UI** - Accessible component primitives
- **TanStack Table** - Powerful table functionality
- **class-variance-authority** - Variant management
- **Vite 7** - Build tool
- **Storybook 10** - Component development
- **Bun** - Package manager and runtime

## Project Structure

```
src/
├── components/
│   ├── primitives/       # Base UI components
│   │   ├── Avatar/
│   │   ├── Badge/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Checkbox/
│   │   ├── Input/
│   │   ├── Label/
│   │   ├── Progress/
│   │   ├── RadioGroup/
│   │   ├── Select/
│   │   ├── Separator/
│   │   ├── Skeleton/
│   │   ├── Slider/
│   │   ├── Switch/
│   │   └── Textarea/
│   ├── composites/       # Composed components
│   │   ├── Alert/
│   │   ├── Dialog/
│   │   ├── DropdownMenu/
│   │   ├── Popover/
│   │   ├── Table/
│   │   ├── Tabs/
│   │   └── Tooltip/
│   └── patterns/         # Complex patterns
│       └── DataTable/
├── styles/
│   └── globals.scss      # Tailwind CSS entry point
├── utils/
│   └── cn.ts             # Class name utility
└── index.ts              # Public exports
```

## Storybook

This project uses [Storybook](https://storybook.js.org/) for component development and documentation. All components have corresponding `.stories.tsx` files that demonstrate their usage, variants, and interactive examples.

### Viewing Storybook

- **Local Development**: Run `bun dev` to start Storybook at `http://localhost:6006`
- **Online**: View the deployed Storybook at [https://agenticindiedev.github.io/ui/](https://agenticindiedev.github.io/ui/) (automatically deployed on push to main)

### Storybook Features

- Interactive component playground
- All component variants and states
- Code examples for each component
- Auto-generated documentation
- Dark mode support

## GitHub Pages Deployment

Storybook is automatically deployed to GitHub Pages on every push to the `main` branch via GitHub Actions. The workflow:

1. Builds Storybook using `bun run build-storybook`
2. Deploys the static build to the `gh-pages` branch
3. Makes it available at [https://agenticindiedev.github.io/ui/](https://agenticindiedev.github.io/ui/)

## License

MIT
