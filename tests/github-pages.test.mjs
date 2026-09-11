import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile, readdir, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { once } from 'node:events';
import { createPagesPreview } from '../scripts/github-pages-preview-server.mjs';

const pages = ['index.html', 'about.html', 'subscribe.html', 'advertise.html', 'contact.html', 'archive.html'];

test('export contains real HTML pages and excludes hosting internals', async () => {
  const files = await readdir('_site');
  for (const page of pages) assert(files.includes(page), page);
  for (const file of files) {
    assert(!file.endsWith('.php'), `PHP page was exported: ${file}`);
    assert(!['_headers', 'server', '.openai'].includes(file), `Hosting internals were exported: ${file}`);
  }
  assert(files.includes('.nojekyll'));
});

for (const mount of ['/', '/a-brand-new-repository/']) {
  test(`all navigation and assets work when hosted at ${mount}`, async t => {
    const server = createPagesPreview({ mount });
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');
    t.after(() => new Promise(resolve => { server.close(resolve); server.closeAllConnections(); }));
    const origin = `http://127.0.0.1:${server.address().port}`;
    const checked = new Set();
    const home = await fetch(origin + mount);
    assert.equal(home.status, 200);
    assert.match(home.headers.get('content-type'), /^text\/html/);
    for (const page of pages) {
      const url = origin + mount + page;
      const response = await fetch(url);
      assert.equal(response.status, 200, page);
      assert.match(response.headers.get('content-type'), /^text\/html/);
      const html = await response.text();
      for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
        const reference = match[1];
        if (reference.startsWith('#') || /^[a-z]+:/i.test(reference)) continue;
        const target = new URL(reference, url);
        assert(target.pathname.startsWith(mount), `Link escapes repository: ${reference}`);
        assert(!target.pathname.endsWith('.php'), `Link still needs PHP: ${reference}`);
        if (checked.has(target.href)) continue;
        checked.add(target.href);
        const resource = await fetch(target, { method: 'HEAD' });
        assert.equal(resource.status, 200, target.href);
        assert(Number(resource.headers.get('content-length')) > 0, target.href);
      }
    }
    const css = await (await fetch(origin + mount + 'style.css')).text();
    const knownMissing = new Set(['images/img03.jpg', 'images/img10.jpg']);
    for (const match of css.matchAll(/url\(["']?([^)'"\s]+)["']?\)/g)) {
      if (knownMissing.has(match[1])) continue;
      assert.equal((await fetch(new URL(match[1], origin + mount + 'style.css'), { method: 'HEAD' })).status, 200);
    }
    assert.equal((await fetch(origin + mount + 'contact.php', { method: 'POST', redirect: 'manual' })).status, 405);
  });
}

test('contact form uses the original external POST handler with the same fields', async () => {
  const html = await readFile('_site/contact.html', 'utf8');
  assert.match(html, /<form action="https:\/\/lindenherald\.com\/contact\.php" method="post">/);
  for (const name of ['lhname', 'lhemail', 'lhphone', 'message4lh']) assert(html.includes(`name="${name}"`));
  // Do not submit any request to the original site's live contact endpoint.
});

test('all original newspaper PDFs and images are exported unchanged', async () => {
  const manifest = JSON.parse(await readFile('source-manifest.json', 'utf8'));
  for (const file of manifest.files.filter(file => /\.(pdf|png|jpg|gif)$/.test(file.path))) {
    const bytes = await readFile('_site/' + file.path);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), file.sha256, file.path);
    assert((await stat('_site/' + file.path)).isFile());
  }
});
