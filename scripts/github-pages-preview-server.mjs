import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.png': 'image/png', '.gif': 'image/gif', '.jpg': 'image/jpeg', '.pdf': 'application/pdf'
};

// Plain static hosting: no PHP handling, SPA fallback, or contact proxy.
// The default mount deliberately models a GitHub project-repository URL.
export function createPagesPreview({ directory = '_site', mount = '/repository-preview/' } = {}) {
  const root = resolve(directory);
  if (!mount.startsWith('/') || !mount.endsWith('/')) throw new Error('The mount needs leading and trailing slashes.');
  return createServer(async (request, response) => {
    try {
      const pathname = new URL(request.url, 'http://localhost').pathname;
      if (pathname === mount.slice(0, -1) || (pathname === '/' && mount !== '/')) {
        response.writeHead(302, { Location: mount });
        response.end();
        return;
      }
      if (!['GET', 'HEAD'].includes(request.method)) {
        response.writeHead(405, { Allow: 'GET, HEAD' });
        response.end();
        return;
      }
      if (!pathname.startsWith(mount)) throw new Error('Outside site');
      const name = decodeURIComponent(pathname.slice(mount.length)) || 'index.html';
      const file = resolve(root, name);
      if (!file.startsWith(root + sep) || name.split('/').some(part => part.startsWith('.') || part.startsWith('_'))) {
        throw new Error('Not public');
      }
      const info = await stat(file);
      if (!info.isFile()) throw new Error('Not a file');
      response.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Content-Length': info.size });
      if (request.method === 'HEAD') response.end();
      else createReadStream(file).on('error', () => response.destroy()).pipe(response);
    } catch {
      response.writeHead(404);
      response.end('Not found');
    }
  });
}
