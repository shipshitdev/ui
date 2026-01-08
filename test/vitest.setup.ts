// Vitest setup file - separate from bun test setup
import { GlobalRegistrator } from '@happy-dom/global-registrator';

GlobalRegistrator.register();

import * as matchers from '@testing-library/jest-dom/matchers';
// Now we can import testing utilities that depend on global document
import { cleanup, configure } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, expect } from 'vitest';

// Suppress act() warnings from Radix UI internal state updates
configure({
  reactStrictMode: false,
});

// Suppress console warnings about act() from Radix UI
// biome-ignore lint/suspicious/noConsole: Intentional - suppressing console warnings in test setup
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].includes('not wrapped in act(...)')) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

// Extend vitest expect with jest-dom matchers
expect.extend(matchers);

// Clean up after each test
afterEach(() => {
  cleanup();
});
