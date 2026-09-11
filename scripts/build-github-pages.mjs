import { copyFile, mkdir, readFile, readdir, rm, writeFile, lstat } from 'node:fs/promises';
import { resolve, relative, sep, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import './verify.mjs';

const project = fileURLToPath(new URL('../', import.meta.url));
const source = resolve(project, 'dist/client');
const output = resolve(project, '_site');

// Only the generated _site directory may be replaced, never source files.
if (relative(project, output) !== '_site' || !output.startsWith(project)) {
  throw new Error('Refusing to replace a directory outside the project.');
}
const existing = await lstat(output).catch(error => {
  if (error.code !== 'ENOENT') throw error;
});
if (existing?.isSymbolicLink()) throw new Error('The output must not be a symbolic link.');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

let files = 0;
async function exportDirectory(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    // Hosting metadata and headers are not public GitHub Pages assets.
    if (entry.name.startsWith('.') || entry.name.startsWith('_')) continue;
    const filename = resolve(directory, entry.name);
    const sourcePath = relative(source, filename);
    if (entry.isSymbolicLink()) throw new Error(`Unexpected symbolic link: ${sourcePath}`);
    if (entry.isDirectory()) {
      await exportDirectory(filename);
      continue;
    }
    if (!entry.isFile() || sourcePath === 'index.php') continue;
    const destination = resolve(output, sourcePath.replace(/\.php$/i, '.html'));
    if (!destination.startsWith(output + sep)) throw new Error('Invalid output path.');
    await mkdir(dirname(destination), { recursive: true });
    if (/\.(html|php)$/i.test(filename)) {
      let html = await readFile(filename, 'utf8');
      // GitHub Pages cannot run a POST handler. Preserve the original endpoint
      // directly; information is sent only when a visitor submits the form.
      html = html.replace(/action="contact\.php"/g, 'action="https://lindenherald.com/contact.php"');
      // Relative links work on both username.github.io/ and /any-repository/.
      html = html.replace(/\b(href|src)="([^"/:?#]+)\.php((?:[?#][^"]*)?)"/g, '$1="$2.html$3"');
      await writeFile(destination, html);
    } else {
      await copyFile(filename, destination);
    }
    files++;
  }
}

await exportDirectory(source);
await writeFile(resolve(output, '.nojekyll'), '');
console.log(`GitHub Pages export ready in _site (${files} files).`);
