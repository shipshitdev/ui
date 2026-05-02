import type { Preview } from '@storybook/react-vite';
import { useEffect } from 'react';
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        light: {
          name: 'light',
          value: '#f6f4ef',
        },

        dark: {
          name: 'dark',
          value: '#050607',
        },
      },
    },
  },

  decorators: [
    (Story, context) => {
      const isDark = context.globals.backgrounds?.value === 'dark';

      useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
        document.documentElement.classList.toggle('light', !isDark);
        document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
      }, [isDark]);

      return (
        <div className="min-h-screen bg-primary p-8 text-primary">
          <Story />
        </div>
      );
    },
  ],

  initialGlobals: {
    backgrounds: {
      value: 'dark',
    },
  },
};

export default preview;
