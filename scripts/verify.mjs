import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import worker from '../dist/server/index.js';

const root = resolve('dist/client');
const manifest = JSON.parse(await readFile('source-manifest.json', 'utf8'));
for (const asset of manifest.files) {
  const bytes = await readFile(resolve(root, asset.path));
  assert.equal(createHash('sha256').update(bytes).digest('hex'), asset.sha256, `${asset.path} differs from the captured original`);
  if (asset.path.endsWith('.pdf')) assert.equal(bytes.subarray(0, 5).toString(), '%PDF-');
}
for (const page of manifest.files.filter(asset => /\.(php|html)$/.test(asset.path))) {
  const html = await readFile(resolve(root, page.path), 'utf8');
  assert(html.includes('<title>') && html.includes('style.css'), `Incomplete page: ${page.path}`);
  for (const match of html.matchAll(/(?:href|src|action)\s*=\s*["']([^"']+)["']/g)) {
    const reference = match[1];
    if (reference.startsWith('#') || /^[a-z]+:/i.test(reference)) continue;
    assert((await stat(resolve(root, decodeURIComponent(reference.split(/[?#]/)[0])))).isFile(), `${page.path}: missing ${reference}`);
  }
}
const stylesheet = await readFile(resolve(root, 'style.css'), 'utf8');
for (const match of stylesheet.matchAll(/url\(["']?([^)'"\s]+)["']?\)/g)) {
  if (manifest.originalMissingAssets.includes(match[1])) continue;
  assert((await stat(resolve(root, match[1]))).isFile(), `Missing CSS asset: ${match[1]}`);
}
assert.equal(typeof worker.fetch, 'function');
console.log(`Verified ${manifest.files.length} original files, all page links, PDF signatures and stylesheet assets.`);
console.log('Two unused CSS images return 404 on the original site; those original references are preserved.');
