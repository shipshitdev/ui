/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import preserveDirectives from 'rollup-preserve-directives';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

const libraryEntries = {
  index: resolve(dirname, 'src/index.ts'),
  common: resolve(dirname, 'src/common/index.ts'),
  boards: resolve(dirname, 'src/boards/index.ts'),
  charts: resolve(dirname, 'src/charts/index.ts'),
  design: resolve(dirname, 'src/design/index.ts'),
  flows: resolve(dirname, 'src/flows/index.ts'),
  primitives: resolve(dirname, 'src/primitives/index.ts'),
  workflows: resolve(dirname, 'src/workflows/index.ts'),
  'prompt-bars': resolve(dirname, 'src/prompt-bars/index.ts'),
};

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig(({ command, mode }) => {
  // Only include dts plugin when building the library (not for Storybook or dev)
  // Check for explicit BUILD_LIBRARY env var set by build-lib.sh script
  const isLibraryBuild =
    command === 'build' && mode === 'production' && process.env.BUILD_LIBRARY === 'true';

  return {
    plugins: [
      react(),
      preserveDirectives(),
      // Only generate .d.ts files when building the library
      ...(isLibraryBuild
        ? [
            dts({
              insertTypesEntry: true,
              rollupTypes: true,
            }),
          ]
        : []),
    ],
    resolve: {
      alias: {
        '@': resolve(dirname, './src'),
      },
    },
    build: {
      lib: {
        entry: libraryEntries,
        name: 'ShipShitDevUI',
        formats: ['es', 'cjs'],
        fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'js' : 'cjs'}`,
      },
      rollupOptions: {
        external: (id) => {
          // Externalize React and React-DOM (peer dependencies)
          if (id === 'react' || id === 'react-dom' || id === 'react/jsx-runtime') {
            return true;
          }

          // Keep heavy visualization runtimes as package dependencies instead of inlining them.
          if (
            id === '@xyflow/react' ||
            id.startsWith('@xyflow/react/') ||
            id === 'recharts' ||
            id.startsWith('recharts/')
          ) {
            return true;
          }

          // Bundle everything else (Radix UI, TanStack, etc.)
          return false;
        },
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'jsxRuntime',
            '@xyflow/react': 'XYFlowReact',
            recharts: 'Recharts',
          },
        },
      },
    },
    test: {
      globals: true,
      environment: 'happy-dom',
      setupFiles: ['./test/vitest.setup.ts'],
      include: ['**/*.{test,spec}.{ts,tsx}'],
      exclude: [
        'node_modules',
        'dist',
        '.idea',
        '.git',
        '.cache',
        '**/*.stories.tsx',
        // Exclude tests that use bun:test - they will be run separately with bun test
        '**/Accordion.test.tsx',
        '**/Badge.test.tsx',
        '**/Breadcrumbs.test.tsx',
        '**/Button.test.tsx',
        '**/Card.test.tsx',
        '**/Checkbox.test.tsx',
        '**/DataTable.test.tsx',
        '**/Dialog.test.tsx',
        '**/DropdownMenu.test.tsx',
        '**/Input.test.tsx',
        '**/Link.test.tsx',
        '**/Loading.test.tsx',
        '**/Menu.test.tsx',
        '**/Navbar.test.tsx',
        '**/Pagination.test.tsx',
        '**/Select.test.tsx',
        '**/Table.test.tsx',
        '**/Tabs.test.tsx',
        '**/Toast.test.tsx',
        '**/Tooltip.test.tsx',
      ],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: [
          'node_modules/',
          'dist/',
          '**/*.stories.tsx',
          '**/*.types.ts',
          '**/index.ts',
          'test/',
          '.storybook/',
          '**/*.config.*',
          '**/vitest.setup.ts',
        ],
        thresholds: {
          lines: 80,
          functions: 80,
          branches: 80,
          statements: 80,
        },
      },
      // Storybook tests disabled temporarily - they require browser environment
      // projects: [
      //   {
      //     extends: true,
      //     plugins: [
      //       storybookTest({
      //         configDir: path.join(dirname, '.storybook'),
      //       }),
      //     ],
      //     test: {
      //       name: 'storybook',
      //       browser: {
      //         enabled: true,
      //         headless: true,
      //         provider: playwright({}),
      //         instances: [
      //           {
      //             browser: 'chromium',
      //           },
      //         ],
      //       },
      //       setupFiles: ['.storybook/vitest.setup.ts'],
      //     },
      //   },
      // ],
    },
  };
});
