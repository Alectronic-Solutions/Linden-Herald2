# Linden Herald copy

A snapshot of https://lindenherald.com/ taken September 10, 2026.

The six public pages were initially copied exactly in commit `ecd6599eaa63063de4e586092886590ea6ff03fc`. The current version adds the requested subtle readability and mobile improvements, preserving the original masthead, teal palette, page content, four images and seven newspaper PDFs. The home page is also available at `/index.php` so the original navigation remains intact.

`refinements.css` adds fluid page widths, a stacked phone layout, six visible navigation links arranged in two rows on phones, larger touch targets, readable body text and a form that fits small screens. Semantic labels, suitable mobile keyboards, autofill hints and tap-to-call links improve usability without adding JavaScript.

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

`dist/client` contains the current site files. `style.css` remains the original stylesheet; `refinements.css` is the separate refinement layer. `source-manifest.json` records the original capture's URLs and SHA-256 checksums, which remain checked for the original stylesheet, images and PDFs. Page links and the matching home-page aliases are also verified. `dist/server/index.js` is the hosting handler; `scripts/serve.mjs` provides the local server, HTML content types for the `.php` snapshots, and byte-range requests for PDFs.

## Original-site dependencies

The original private PHP source and mail backend are not publicly available. When a visitor explicitly submits the contact form, the server responds with a 307 redirect to the original HTTPS contact page, preserving the POST method and form fields. No messages were submitted during development. Actual delivery depends on the original site and has not been tested.

The original stylesheet references two unused images (`images/img03.jpg` and `images/img10.jpg`) which return 404 at the source. Their unused CSS rules have been left unchanged rather than inventing replacements.

This is a captured version. Later updates to the live site and its archive do not automatically appear here.
