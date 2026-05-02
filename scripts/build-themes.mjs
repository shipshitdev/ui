import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const themes = {
  dark: {
    '--bg-primary': '#050607',
    '--bg-secondary': '#0c0d10',
    '--bg-tertiary': '#131518',
    '--bg-elevated': '#1a1c21',
    '--bg-hover': '#20232a',
    '--border': 'rgba(255, 255, 255, 0.10)',
    '--border-strong': 'rgba(255, 255, 255, 0.18)',
    '--text-primary': '#f4f4f5',
    '--text-secondary': '#b4b4bc',
    '--text-muted': '#6b6b78',
    '--accent': '#fafafa',
    '--accent-foreground': '#050607',
    '--accent-hover': '#e4e4e7',
    '--success': '#10b981',
    '--warning': '#f59e0b',
    '--danger': '#ef4444',
    '--info': '#3b82f6',
    '--agent': '#38bdf8',
    '--done': '#a855f7',
  },
  light: {
    '--bg-primary': '#f6f4ef',
    '--bg-secondary': '#efeae1',
    '--bg-tertiary': '#e6dfd3',
    '--bg-elevated': '#fbfaf7',
    '--bg-hover': '#ddd3c2',
    '--border': 'rgba(28, 25, 23, 0.10)',
    '--border-strong': 'rgba(28, 25, 23, 0.18)',
    '--text-primary': '#18181b',
    '--text-secondary': '#57534e',
    '--text-muted': '#8a8175',
    '--accent': '#111827',
    '--accent-foreground': '#fafaf9',
    '--accent-hover': '#1f2937',
    '--success': '#0f9f6e',
    '--warning': '#d97706',
    '--danger': '#dc2626',
    '--info': '#2563eb',
    '--agent': '#0284c7',
    '--done': '#7c3aed',
  },
};

function generateThemeCss(themeName, themeConfig, oppositeThemeConfig) {
  const selector =
    themeName === 'dark' ? ':root, .dark, [data-theme="dark"]' : '.light, [data-theme="light"]';
  const oppositeSelector =
    themeName === 'dark' ? '.light, [data-theme="light"]' : '.dark, [data-theme="dark"]';

  let css = `@source '../**/*.{js,cjs}';\n\n`;
  css += `${selector} {\n`;
  for (const [key, value] of Object.entries(themeConfig)) {
    css += `  ${key}: ${value};\n`;
  }
  css += `  color-scheme: ${themeName};\n`;
  css += '}\n\n';

  css += `${oppositeSelector} {\n`;
  for (const [key, value] of Object.entries(oppositeThemeConfig)) {
    css += `  ${key}: ${value};\n`;
  }
  css += `  color-scheme: ${themeName === 'dark' ? 'light' : 'dark'};\n`;
  css += '}\n\n';

  css += '@layer base {\n';
  css += '  *, ::before, ::after { border-color: var(--border); }\n';
  css += '}\n';

  return css;
}

const distThemesDir = join(rootDir, 'dist', 'themes');
mkdirSync(distThemesDir, { recursive: true });

for (const [themeName, themeConfig] of Object.entries(themes)) {
  const oppositeThemeName = themeName === 'light' ? 'dark' : 'light';
  const css = generateThemeCss(themeName, themeConfig, themes[oppositeThemeName]);
  const outputPath = join(distThemesDir, `${themeName}.css`);
  writeFileSync(outputPath, css, 'utf-8');
  console.log(`Generated dist/themes/${themeName}.css`);
}
