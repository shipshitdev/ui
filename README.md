# AgenticIndieDevUI

A modern React component library built with TypeScript, Tailwind CSS v4, Radix UI, and shadcn/ui patterns.

📖 **[View Storybook Documentation](https://agenticindiedev.github.io/ui/)**

## Installation

```bash
bun add @agenticindiedev/ui
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

All components accept a `className` prop that merges seamlessly with existing styles, allowing you to customize components easily:

```tsx
<Button
  variant="primary"
  className="bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:scale-105"
>
  Custom Styled Button
</Button>
```

### Theming

The package uses CSS variables for theming. You can customize colors by overriding CSS variables:

```css
:root {
  --primary: 199.1 89.1% 48.2%;
  --primary-foreground: 210 40% 98%;
  /* ... */
}
```

Dark mode is supported via the `dark` class on your HTML element.

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

## Migration from DaisyUI

If you were using DaisyUI, note that this package has migrated to shadcn/ui patterns with Radix UI primitives. The API remains similar, but components now use Radix UI for better accessibility and TypeScript support.

### Breaking Changes

- DaisyUI classes are no longer available
- Components now use CSS variables for theming instead of DaisyUI themes
- Some component APIs have been updated to match shadcn/ui patterns

### Benefits

- ✅ Better accessibility (Radix UI primitives)
- ✅ Full TypeScript support
- ✅ More customization options
- ✅ Better performance
- ✅ Active maintenance and updates

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
