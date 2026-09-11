import { mkdir, copyFile } from 'node:fs/promises';
import './verify.mjs';

// Pages and the responsive stylesheet are served directly. The original
// stylesheet, images and PDFs are preserved without processing.
await mkdir('dist/.openai', { recursive: true });
await copyFile('.openai/hosting.json', 'dist/.openai/hosting.json');
console.log('Ready: responsive pages, preserved original assets and contact routing.');
