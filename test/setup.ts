// Must register happy-dom globals first, before any other imports
import { GlobalRegistrator } from '@happy-dom/global-registrator';

GlobalRegistrator.register();

import { afterAll, afterEach, beforeAll, expect } from 'bun:test';
import * as matchers from '@testing-library/jest-dom/matchers';
// Now we can import testing utilities that depend on global document
import { cleanup, configure } from '@testing-library/react';

// Suppress act() warnings from Radix UI internal state updates
configure({
  reactStrictMode: false,
});

// Suppress console warnings about act() from Radix UI
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

// Extend bun:test expect with jest-dom matchers
expect.extend(matchers);

// Clean up after each test
afterEach(() => {
  cleanup();
});
