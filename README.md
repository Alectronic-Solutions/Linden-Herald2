# Linden Herald copy

A snapshot of https://lindenherald.com/ taken September 10, 2026.

The six public pages were initially copied exactly in commit `ecd6599eaa63063de4e586092886590ea6ff03fc`. The current version adds the requested subtle readability and mobile improvements, preserving the original masthead, teal palette, page content, four images and seven newspaper PDFs. The home page is also available at `/index.php` so the original navigation remains intact.

`refinements.css` adds fluid page widths, a stacked phone layout, six visible navigation links arranged in two rows on phones, larger touch targets, readable body text and a form that fits small screens. Semantic labels, suitable mobile keyboards, autofill hints and tap-to-call links improve usability without adding JavaScript.

## Publish a new GitHub repository with GitHub Pages

1. Create an empty GitHub repository and commit/push this whole project, including `.github/workflows/pages.yml`. Keep the newspaper PDFs in Git; do not commit `_site/` or `.artifacts/`.
2. In the new repository, select **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Open **Actions → Check and deploy GitHub Pages → Run workflow**, using the repository's default branch. If the first automatic run failed before Pages was enabled, rerun it after step 2.
4. The deployment job reports the website URL. Subsequent pushes to the default branch automatically build, check and publish the site. Pull requests and other branches run checks without publishing.

No repository name is hard-coded. Both `https://YOUR-ACCOUNT.github.io/YOUR-REPOSITORY/` project sites and `https://YOUR-ACCOUNT.github.io/` user sites are supported. The workflow uses GitHub's automatic credentials; it needs no manually created token or Sites/Cloudflare credentials. GitHub Pages must be available for the repository's visibility and account plan.

The Pages build converts the captured `.php` documents into normal `.html` files and rewrites their navigation links. It exports only public assets into `_site/`, omitting the Worker and hosting metadata. All visual styles and PDF files are retained. GitHub Pages cannot execute PHP or the contact redirect, so the exported form posts directly to `https://lindenherald.com/contact.php`. Actual delivery still depends on that original service.

[GitHub Pages workflow setup](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) · [GitHub Pages static hosting limitations](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)

## Build and preview the GitHub Pages version locally

Requires Node.js 22 or newer (the workflow uses Node.js 24), with no package dependencies to install.

```sh
npm run build:pages
npm run test:pages
npm run preview:pages
```

Open `http://localhost:4173/repository-preview/`. This preview deliberately uses a repository subpath and ordinary static HTML serving, like a GitHub project site. The checks exercise both root and repository-subpath URLs, navigation, images, stylesheet assets, unchanged PDFs, and the contact form's target without sending a message.

Edit the source pages and styles in `dist/client`, then build again. `_site/` is generated and ignored by Git. The repository does not need an `npm install` step or a lockfile because it has no external package dependencies.

## Run the original Sites/local version

Requires Node.js 22 or newer, with no package dependencies.

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
