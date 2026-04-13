# Mirror Analytics

## Static hosting / GitHub Pages

Do **not** open the root `index.html` directly from the source code folder.

Use the built static site inside `docs/` instead:

1. Run `npm install`
2. Run `npm run build:static`
3. Upload the contents of `docs/` to GitHub Pages, or set GitHub Pages to deploy from the `docs` folder.

The `docs/404.html` fallback is included so client-side routing still works on GitHub Pages.
