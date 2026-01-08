import type { Theme } from '../themes';

const THEME_STORAGE_KEY = '@shipshitdev/ui-theme';
const THEME_ATTRIBUTE = 'data-theme';

/**
 * Get the current theme from localStorage or system preference
 */
export function getTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light';
  }

  // Check localStorage first
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  // Fall back to system preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
}

/**
 * Set the theme and persist to localStorage
 */
export function setTheme(theme: Theme): void {
  if (typeof window === 'undefined') {
    return;
  }

  const root = document.documentElement;

  // Remove existing theme classes
  root.classList.remove('light', 'dark');

  // Add new theme class
  root.classList.add(theme);
  root.setAttribute(THEME_ATTRIBUTE, theme);

  // Persist to localStorage
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

/**
 * Initialize theme on page load
 */
export function initTheme(): Theme {
  const theme = getTheme();
  setTheme(theme);
  return theme;
}

/**
 * Watch for system preference changes
 * Returns a cleanup function to stop watching
 */
export function watchSystemPreference(callback?: (theme: Theme) => void): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const handleChange = (e: MediaQueryListEvent) => {
    // Only apply system preference if no theme is stored
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (!stored) {
      const theme = e.matches ? 'dark' : 'light';
      setTheme(theme);
      callback?.(theme);
    }
  };

  // Modern browsers
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }

  // Fallback for older browsers
  mediaQuery.addListener(handleChange);
  return () => {
    mediaQuery.removeListener(handleChange);
  };
}

/**
 * Toggle between light and dark themes
 */
export function toggleTheme(): Theme {
  const current = getTheme();
  const next = current === 'light' ? 'dark' : 'light';
  setTheme(next);
  return next;
}
