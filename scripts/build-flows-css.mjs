import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');

const xyflowBaseCss = readFileSync(
  join(rootDir, 'node_modules', '@xyflow', 'react', 'dist', 'style.css'),
  'utf-8'
);
const flowThemeCss = readFileSync(join(rootDir, 'src', 'styles', 'flows.css'), 'utf-8');

mkdirSync(distDir, { recursive: true });
writeFileSync(join(distDir, 'flows.css'), `${xyflowBaseCss}\n\n${flowThemeCss}`, 'utf-8');

console.log('Generated dist/flows.css');
