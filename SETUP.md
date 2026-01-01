# Setup Guide

Complete setup guide for using `@agenticindiedev/ui` in your project.

## Prerequisites

- Node.js 18+ or Bun
- A React project (Next.js, Vite, Create React App, etc.)
- Tailwind CSS installed

## Installation

```bash
# Using Bun
bun add @agenticindiedev/ui
```

## Step 1: Configure Tailwind CSS

### Option A: Using the Preset (Recommended)

Add the preset to your `tailwind.config.ts`:

```ts
import type { Config } from 'tailwindcss';

export default {
  presets: [require('@agenticindiedev/ui/tailwind.preset')],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    // Include the library in content paths
    '@agenticindiedev/ui/dist/**/*.{js,cjs}',
  ],
  // Your other Tailwind config...
} satisfies Config;
```

### Option B: Manual Configuration

If you prefer not to use the preset, you can manually configure Tailwind:

```ts
import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '@agenticindiedev/ui/dist/**/*.{js,cjs}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // ... (see tailwind.preset.ts for full config)
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
} satisfies Config;
```

## Step 2: Import Theme CSS

Theme files are **composable** and contain only CSS variable definitions. You'll need to import Tailwind CSS separately and compose the theme with your own styles.

### Tailwind CSS v4 (Recommended)

For Tailwind CSS v4, use the `@use` directive in your SCSS file:

**Create or update your `globals.scss` (or `app.scss`, `main.scss`, etc.):**

```scss
@use 'tailwindcss';
@use '@agenticindiedev/ui/themes/dark' as *;

@theme {
  /* Map agentic UI CSS variables to Tailwind v4 theme variables */
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
  
  /* Add your custom theme overrides here */
  /* --color-primary: hsl(142 76% 36%); */
}

@layer base {
  body {
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
  }
}
```

Theme files include an `@source` directive so Tailwind scans the UI package and generates component utilities. If you skip the theme import or use a custom theme file, add this to your globals:

```scss
@source '../../node_modules/@agenticindiedev/ui/dist/**/*.{js,cjs}';
```

**Then import this SCSS file in your app entry point:**

```tsx
// In your main.tsx, App.tsx, or _app.tsx
import './globals.scss';
```

### Light Theme Alternative

To use the light theme instead:

```scss
@use 'tailwindcss';
@use '@agenticindiedev/ui/themes/light' as *;

@theme {
  /* Same @theme mapping as above */
}
```

### Tailwind CSS v3 (Legacy)

If you're using Tailwind CSS v3, you can still import themes directly:

```tsx
// In your main.tsx, App.tsx, or _app.tsx
import '@agenticindiedev/ui/themes/dark';
```

**Important:**

- For Tailwind v4: Use `@use` pattern in your SCSS file (recommended)
- For Tailwind v3: Import theme SCSS directly in your TSX/JSX file
- Theme files are composable - you can add custom `@theme` blocks to override or extend variables
- Only import **ONE** theme SCSS file

## Step 3: Use Components

Import and use components:

```tsx
import { Button, Card, CardHeader, CardContent } from '@agenticindiedev/ui';

function App() {
  return (
    <Card>
      <CardHeader>
        <h2>Welcome</h2>
      </CardHeader>
      <CardContent>
        <Button variant="primary">Get Started</Button>
      </CardContent>
    </Card>
  );
}
```

## Theme Management

### Initialize Theme

Call `initTheme()` when your app loads to apply the saved theme or system preference:

```tsx
import { initTheme } from '@agenticindiedev/ui';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    initTheme();
  }, []);

  return <YourApp />;
}
```

### Switch Themes Programmatically

```tsx
import { setTheme, getTheme, toggleTheme } from '@agenticindiedev/ui';

// Set a specific theme
setTheme('dark'); // or 'light'

// Toggle between themes
toggleTheme();

// Get current theme
const current = getTheme(); // Returns 'light' | 'dark'
```

### Watch System Preference

Automatically switch themes based on system preference:

```tsx
import { watchSystemPreference } from '@agenticindiedev/ui';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const cleanup = watchSystemPreference((theme) => {
      console.log('Theme changed to:', theme);
    });

    return cleanup; // Cleanup on unmount
  }, []);

  return <YourApp />;
}
```

## Framework-Specific Setup

### Next.js

1. Install the package:

```bash
bun add @agenticindiedev/ui
```

2. Update `tailwind.config.ts`:

```ts
import type { Config } from 'tailwindcss';

export default {
  presets: [require('@agenticindiedev/ui/tailwind.preset')],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@agenticindiedev/ui/dist/**/*.{js,cjs}',
  ],
} satisfies Config;
```

3. Create `app/globals.scss` (or update existing):

```scss
@use 'tailwindcss';
@use '@agenticindiedev/ui/themes/dark' as *;

@theme {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  /* ... map all theme variables ... */
}
```

4. Import `globals.scss` in `app/layout.tsx`:

```tsx
import './globals.scss';
```

### Vite + React

1. Install the package:

```bash
bun add @agenticindiedev/ui
```

2. Update `tailwind.config.ts`:

```ts
import type { Config } from 'tailwindcss';

export default {
  presets: [require('@agenticindiedev/ui/tailwind.preset')],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@agenticindiedev/ui/dist/**/*.{js,cjs}',
  ],
} satisfies Config;
```

3. Create `src/globals.scss`:

```scss
@use 'tailwindcss';
@use '@agenticindiedev/ui/themes/dark' as *;

@theme {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  /* ... map all theme variables ... */
}
```

4. Import `globals.scss` in `src/main.tsx`:

```tsx
import './globals.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Create React App

1. Install the package:

```bash
bun add @agenticindiedev/ui
```

2. Update `tailwind.config.js`:

```js
module.exports = {
  presets: [require('@agenticindiedev/ui/tailwind.preset')],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@agenticindiedev/ui/dist/**/*.{js,cjs}',
  ],
};
```

3. Create `src/globals.scss`:

```scss
@use 'tailwindcss';
@use '@agenticindiedev/ui/themes/dark' as *;

@theme {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  /* ... map all theme variables ... */
}
```

4. Import `globals.scss` in `src/index.js`:

```js
import './globals.scss';
```

## Customization

### Method 1: Override CSS Variables (Recommended)

The easiest way to customize colors globally is by overriding CSS variables. This affects all components using those color tokens.

**Example: Change Button Primary Color to Green**

```css
/* In your global CSS file (e.g., globals.css, app.css) */
:root {
  --primary: 142 76% 36%; /* Your custom green */
  --primary-foreground: 0 0% 100%;
}
```

All buttons with `variant="primary"` will now use your custom green color.

**All Available CSS Variables:**

```css
:root {
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

  /* Background & Text */
  --background: 0 0% 100%;
  --foreground: 222.2 47.4% 11.2%;

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

### Method 2: Component-Specific Styling (className)

For one-off customizations, use the `className` prop:

```tsx
<Button
  variant="primary"
  className="bg-purple-500 hover:bg-purple-600 shadow-lg"
>
  Custom Purple Button
</Button>
```

### Method 3: Create Custom Theme File

Create your own theme SCSS file with all your custom colors:

**For Tailwind CSS v4:**

```scss
/* my-theme.scss */
@use 'tailwindcss';
@use '@agenticindiedev/ui/themes/dark' as *;

:root {
  --primary: 142 76% 36%; /* Your brand color */
  --primary-foreground: 0 0% 100%;
  /* ... define all your colors */
  --radius: 0.75rem;
}

@theme {
  /* Map your custom variables to Tailwind */
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  /* ... */
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
import './my-theme.scss';
```

**For Tailwind CSS v3:**

```css
/* my-theme.css */
@import 'tailwindcss';

:root {
  --primary: 142 76% 36%; /* Your brand color */
  --primary-foreground: 0 0% 100%;
  /* ... define all your colors */
  --radius: 0.75rem;
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
import './my-theme.css';
```

### Method 4: Tailwind Config Override

Extend colors in your `tailwind.config.ts`:

```ts
import type { Config } from 'tailwindcss';

export default {
  presets: [require('@agenticindiedev/ui/tailwind.preset')],
  theme: {
    extend: {
      colors: {
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

Customize dark mode by adding styles to the `.dark` class:

```css
.dark {
  --primary: 142 76% 50%; /* Lighter for dark mode */
  --background: 222.2 47.4% 11.2%;
  --foreground: 210 40% 98%;
}
```

## Troubleshooting

### Components don't have styles

1. Make sure you've imported the theme SCSS file
2. Verify Tailwind is processing the library's content paths
3. Check that your build tool is processing SCSS files

### Theme not switching

1. Ensure you're importing the correct theme SCSS file
2. Call `initTheme()` on app load
3. Check that the `dark` class is being applied to the HTML element

### TypeScript errors

Make sure you have TypeScript 5.0+ and React types installed:

```bash
bun add -d typescript @types/react @types/react-dom
```

## Next Steps

- Browse the [Storybook documentation](https://agenticindiedev.github.io/ui/) for component examples
- Check the [README](./README.md) for component API documentation
- Explore component source code for advanced customization
