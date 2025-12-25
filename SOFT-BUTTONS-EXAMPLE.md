# Soft Button Variants - Usage Examples

The Button component now includes DaisyUI-style soft button variants using class-variance-authority (CVA).

## Available Soft Variants

- `soft-primary` - Blue pastel style
- `soft-secondary` - Neutral pastel style
- `soft-success` - Green pastel style
- `soft-warning` - Orange/Yellow pastel style
- `soft-destructive` - Red pastel style

## Usage

```tsx
import { Button } from '@agenticindiedev/ui';

// Soft Primary
<Button variant="soft-primary">View Details</Button>

// Soft Success
<Button variant="soft-success">Log Revenue</Button>

// Soft Warning
<Button variant="soft-warning">Pending Review</Button>

// Soft Destructive
<Button variant="soft-destructive">Log Cost</Button>

// Soft Secondary
<Button variant="soft-secondary">Cancel</Button>
```

## Visual Appearance

All soft variants feature:

- **Light backgrounds** with 15% opacity in light mode (25% on hover)
- **Colored text** matching the variant theme
- **Dark mode support** with adjusted opacity and colors
- **Smooth transitions** between states

## CSS Classes Applied

### Soft Primary

```css
bg-primary-500/15 text-primary-600 hover:bg-primary-500/25
dark:bg-primary-400/15 dark:text-primary-400 dark:hover:bg-primary-400/25
```

### Soft Success

```css
bg-green-500/15 text-green-600 hover:bg-green-500/25
dark:bg-green-400/15 dark:text-green-400 dark:hover:bg-green-400/25
```

### Soft Warning

```css
bg-yellow-500/15 text-yellow-600 hover:bg-yellow-500/25
dark:bg-yellow-400/15 dark:text-yellow-400 dark:hover:bg-yellow-400/25
```

### Soft Destructive

```css
bg-red-500/15 text-red-600 hover:bg-red-500/25
dark:bg-red-400/15 dark:text-red-400 dark:hover:bg-red-400/25
```

### Soft Secondary

```css
bg-gray-500/15 text-gray-700 hover:bg-gray-500/25
dark:bg-gray-400/15 dark:text-gray-300 dark:hover:bg-gray-400/25
```

## Implementation Details

The soft variants were added to the `buttonVariants` CVA definition in:

- **File**: `/src/components/primitives/Button/Button.tsx`
- **Method**: Added 5 new variant options to the existing CVA configuration
- **Tests**: Added test coverage in `Button.test.tsx` for all soft variants

## Combining with Other Props

Soft variants work seamlessly with all other Button props:

```tsx
// With sizes
<Button variant="soft-success" size="lg">Large Success</Button>
<Button variant="soft-warning" size="sm">Small Warning</Button>

// With icons
<Button variant="soft-destructive" leftIcon={<TrashIcon />}>
  Delete Item
</Button>

// With loading state
<Button variant="soft-primary" isLoading>
  Processing...
</Button>
```
