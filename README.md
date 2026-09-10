# Linden Herald copy

A snapshot of https://lindenherald.com/ taken September 10, 2026.

The six public pages, original stylesheet, four available images and seven linked newspaper PDFs are copied without changing their bytes. The home page is also available at `/index.php` so the original navigation remains intact. Original attribution, wording, typography, spacing, colors, mobile styles and archive filenames are preserved.

## Run

Requires Node.js 18 or newer, with no package dependencies.

```sh
npm run dev
```

Open http://localhost:5173/. Optional: `npm run dev -- --port 3000`.

```sh
npm run check
npm run build
```

`dist/client` contains the unchanged site files. `source-manifest.json` records the source URL and SHA-256 checksum of each captured file. `dist/server/index.js` is the hosting handler; `scripts/serve.mjs` provides the local server, HTML content types for the `.php` snapshots, and byte-range requests for PDFs.

## Original-site dependencies

The original private PHP source and mail backend are not publicly available. When a visitor explicitly submits the contact form, the server responds with a 307 redirect to the original HTTPS contact page, preserving the POST method and form fields. No messages were submitted during development. Actual delivery depends on the original site and has not been tested.

The original stylesheet references two unused images (`images/img03.jpg` and `images/img10.jpg`) which return 404 at the source. Their unused CSS rules have been left unchanged rather than inventing replacements.

This is a captured version. Later updates to the live site and its archive do not automatically appear here.
