import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Read the TypeScript preset file
const presetPath = join(rootDir, 'tailwind.preset.ts');
const presetContent = readFileSync(presetPath, 'utf-8');

// Convert TypeScript to JavaScript
// Remove type imports and type annotations
const jsContent = presetContent
  // Remove type imports (but preserve the line if it's part of a comment)
  .replace(/^import type .*? from .*?;$/gm, '')
  // Remove type annotations from const declarations
  .replace(/: Config(?=\s*[={])/g, '')
  // Change export default to module.exports
  .replace(/export default preset;/, 'module.exports = preset;');

// Ensure dist directory exists
const distDir = join(rootDir, 'dist');
mkdirSync(distDir, { recursive: true });

// Write the compiled JavaScript file
const outputPath = join(distDir, 'tailwind.preset.js');
writeFileSync(outputPath, jsContent, 'utf-8');

console.log('✅ Compiled tailwind.preset.ts → dist/tailwind.preset.js');
