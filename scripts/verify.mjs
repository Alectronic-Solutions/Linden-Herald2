import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import worker from '../dist/server/index.js';

const root = resolve('dist/client');
const manifest = JSON.parse(await readFile('source-manifest.json', 'utf8'));
for (const asset of manifest.files) {
  const bytes = await readFile(resolve(root, asset.path));
  // The original stylesheet and all images/PDFs remain immutable. The pages
  // now include the requested responsive stylesheet and semantic improvements.
  if (!/\.(php|html)$/.test(asset.path)) {
    assert.equal(createHash('sha256').update(bytes).digest('hex'), asset.sha256, `${asset.path} differs from the captured original`);
  }
  if (asset.path.endsWith('.pdf')) assert.equal(bytes.subarray(0, 5).toString(), '%PDF-');
}
for (const page of manifest.files.filter(asset => /\.(php|html)$/.test(asset.path))) {
  const html = await readFile(resolve(root, page.path), 'utf8');
  assert(html.includes('<title>') && html.includes('style.css') && html.includes('refinements.css'), `Incomplete page: ${page.path}`);
  for (const match of html.matchAll(/(?:href|src|action)\s*=\s*["']([^"']+)["']/g)) {
    const reference = match[1];
    if (reference.startsWith('#') || /^[a-z]+:/i.test(reference)) continue;
    assert((await stat(resolve(root, decodeURIComponent(reference.split(/[?#]/)[0])))).isFile(), `${page.path}: missing ${reference}`);
  }
}
assert.equal(await readFile(resolve(root, 'index.html'), 'utf8'), await readFile(resolve(root, 'index.php'), 'utf8'), 'Home page aliases must match');
const stylesheet = await readFile(resolve(root, 'style.css'), 'utf8');
for (const match of stylesheet.matchAll(/url\(["']?([^)'"\s]+)["']?\)/g)) {
  if (manifest.originalMissingAssets.includes(match[1])) continue;
  assert((await stat(resolve(root, match[1]))).isFile(), `Missing CSS asset: ${match[1]}`);
}
assert.equal(typeof worker.fetch, 'function');
console.log('Verified original stylesheet, images and PDFs; all seven page entrypoints, page links, home aliases and PDF signatures.');
console.log('Two unused CSS images return 404 on the original site; those original references are preserved.');
