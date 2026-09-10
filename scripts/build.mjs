import { mkdir, copyFile } from 'node:fs/promises';
import './verify.mjs';

// The HTML, CSS, images and PDFs are the actual downloaded source assets.
// No minification, rewriting or transpilation changes their original bytes.
await mkdir('dist/.openai', { recursive: true });
await copyFile('.openai/hosting.json', 'dist/.openai/hosting.json');
console.log('Ready: unchanged source assets and the contact routing handler.');
