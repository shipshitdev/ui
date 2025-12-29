/**
 * Shared style constants for consistent styling across components
 * Import these with the cn() utility for class merging
 */

// Focus styles - removes browser default outline
export const focusStyles = 'focus-visible:outline-none';
export const focusOutlineStyles = 'focus:outline-none';

// Disabled state styles
export const disabledStyles = 'disabled:pointer-events-none disabled:opacity-50';

export const disabledCursorStyles = 'disabled:cursor-not-allowed disabled:opacity-50';

// Form input focus - subtle border change instead of ring
export const inputFocusStyles =
  'focus-visible:outline-none focus-visible:border-foreground hover:border-foreground/50';

// Transitions
export const transitionColors = 'transition-colors';

export const transitionAll = 'transition-all duration-200';

// Cursor styles for clickable elements
export const cursorPointer = 'cursor-pointer';
