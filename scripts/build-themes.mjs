import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Theme configurations
const themes = {
  light: {
    background: '0 0% 98%',
    foreground: '222.2 47.4% 11.2%',
    card: '0 0% 99%',
    'card-foreground': '222.2 47.4% 11.2%',
    popover: '0 0% 99%',
    'popover-foreground': '222.2 47.4% 11.2%',
    primary: '199.1 89.1% 48.2%',
    'primary-foreground': '210 40% 98%',
    secondary: '210 20% 96%',
    'secondary-foreground': '222.2 47.4% 11.2%',
    muted: '210 20% 96%',
    'muted-foreground': '215.4 16.3% 46.9%',
    accent: '210 20% 96%',
    'accent-foreground': '222.2 47.4% 11.2%',
    destructive: '0 84.2% 60.2%',
    'destructive-foreground': '210 40% 98%',
    border: '214.3 20% 91%',
    input: '214.3 20% 91%',
    ring: '199.1 89.1% 48.2%',
    radius: '0.5rem',
  },
  dark: {
    background: '222.2 47.4% 11.2%',
    foreground: '210 40% 98%',
    card: '222.2 47.4% 11.2%',
    'card-foreground': '210 40% 98%',
    popover: '222.2 47.4% 11.2%',
    'popover-foreground': '210 40% 98%',
    primary: '199.1 89.1% 48.2%',
    'primary-foreground': '210 40% 98%',
    secondary: '217.2 32.6% 17.5%',
    'secondary-foreground': '210 40% 98%',
    muted: '217.2 32.6% 17.5%',
    'muted-foreground': '215 20.2% 65.1%',
    accent: '217.2 32.6% 17.5%',
    'accent-foreground': '210 40% 98%',
    destructive: '0 62.8% 30.6%',
    'destructive-foreground': '210 40% 98%',
    border: '217.2 32.6% 17.5%',
    input: '217.2 32.6% 17.5%',
    ring: '199.1 89.1% 48.2%',
    radius: '0.5rem',
  },
};

function generateThemeSCSS(themeName, themeConfig, oppositeThemeConfig) {
  // Theme SCSS files are composable for Tailwind CSS v4
  // They contain only CSS variables and keyframes - no Tailwind import
  // Usage in consuming app:
  //   @use 'tailwindcss';
  //   @use '@agenticindiedev/ui/themes/dark.scss' as *;
  //   @theme { /* custom overrides */ }

  let scss = `/**
 * ${themeName.charAt(0).toUpperCase() + themeName.slice(1)} Theme - Composable CSS Variables
 *
 * This theme file contains CSS variable definitions only.
 * Import it in your app's SCSS file alongside Tailwind CSS v4:
 *
 * @use 'tailwindcss';
 * @use '@agenticindiedev/ui/themes/${themeName}.scss' as *;
 *
 * You can then add custom @theme blocks to override or extend these variables.
 */

`;

  // Default theme in :root
  scss += ':root {\n';
  for (const [key, value] of Object.entries(themeConfig)) {
    scss += `  --${key}: ${value};\n`;
  }
  scss += '}\n\n';

  // Opposite theme for dynamic switching
  if (themeName === 'light') {
    // light.scss: .dark selector for dark theme
    scss += '.dark {\n';
    for (const [key, value] of Object.entries(oppositeThemeConfig)) {
      scss += `  --${key}: ${value};\n`;
    }
    scss += '}\n\n';
  } else if (themeName === 'dark') {
    // dark.scss: .light selector for light theme
    scss += '.light {\n';
    for (const [key, value] of Object.entries(oppositeThemeConfig)) {
      scss += `  --${key}: ${value};\n`;
    }
    scss += '}\n\n';
  }

  // Add keyframes (needed for accordion and other components)
  scss += '@keyframes accordion-down {\n';
  scss += '  from { height: 0; }\n';
  scss += '  to { height: var(--radix-accordion-content-height); }\n';
  scss += '}\n\n';
  scss += '@keyframes accordion-up {\n';
  scss += '  from { height: var(--radix-accordion-content-height); }\n';
  scss += '  to { height: 0; }\n';
  scss += '}\n';

  return scss;
}

// Create dist/themes directory
const distThemesDir = join(rootDir, 'dist', 'themes');
mkdirSync(distThemesDir, { recursive: true });

// Generate SCSS for each theme with opposite theme for switching
for (const [themeName, themeConfig] of Object.entries(themes)) {
  // Get opposite theme config
  const oppositeThemeName = themeName === 'light' ? 'dark' : 'light';
  const oppositeThemeConfig = themes[oppositeThemeName];

  const scss = generateThemeSCSS(themeName, themeConfig, oppositeThemeConfig);
  const outputPath = join(distThemesDir, `${themeName}.scss`);
  writeFileSync(outputPath, scss, 'utf-8');
  console.log(
    `✅ Generated dist/themes/${themeName}.scss (with ${oppositeThemeName} theme support)`
  );
}

console.log('✅ All themes built successfully!');
