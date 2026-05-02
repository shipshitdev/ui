import type { Config } from 'tailwindcss';

const preset: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['@shipshitdev/ui/dist/**/*.{js,cjs}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-primary)',
        foreground: 'var(--text-primary)',
        card: {
          DEFAULT: 'var(--bg-secondary)',
          foreground: 'var(--text-primary)',
        },
        popover: {
          DEFAULT: 'var(--bg-elevated)',
          foreground: 'var(--text-primary)',
        },
        muted: {
          DEFAULT: 'var(--bg-tertiary)',
          foreground: 'var(--text-muted)',
        },
        secondary: {
          DEFAULT: 'var(--bg-secondary)',
          foreground: 'var(--text-primary)',
        },
        tertiary: 'var(--bg-tertiary)',
        elevated: 'var(--bg-elevated)',
        hover: 'var(--bg-hover)',
        border: 'var(--border)',
        'border-strong': 'var(--border-strong)',
        input: 'var(--border)',
        ring: 'var(--accent)',
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
          hover: 'var(--accent-hover)',
        },
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
        destructive: {
          DEFAULT: 'var(--danger)',
          foreground: '#fff',
        },
        info: 'var(--info)',
        agent: 'var(--agent)',
        done: 'var(--done)',
      },
      borderRadius: {
        sm: '4px',
        md: '6px',
        lg: '10px',
        xl: '16px',
        '2xl': '20px',
      },
      fontFamily: {
        sans: ['var(--app-font-sans)'],
        mono: ['SF Mono', 'SFMono-Regular', 'Consolas', 'Menlo', 'monospace'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'slide-progress': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(500%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'slide-progress': 'slide-progress 2s linear infinite',
      },
    },
  },
  plugins: [],
};

export default preset;
