import { access } from 'node:fs/promises';
import { createPagesPreview } from './github-pages-preview-server.mjs';

await access('_site/index.html').catch(() => {
  throw new Error('Run npm run build:pages before starting the GitHub Pages preview.');
});
const port = Number(process.env.PORT || 4173);
createPagesPreview().listen(port, '127.0.0.1', () => {
  console.log(`GitHub Pages preview: http://localhost:${port}/repository-preview/`);
});
