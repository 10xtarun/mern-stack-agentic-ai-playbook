# Build & Deployment Workflow

## Local Development
```bash
# Install packages
npm install

# Verify logic and Run locally
npx tsc --noEmit
npm run dev
```

## Adding and Modifying Content Workflows
1. Place standard `.md` text in `content/[category]/filename.md`. 
2. Update the `CONTENT_MANIFEST` dictionary inside `lib/content.ts` with explicit `{ slug, title, category, order, description, file }` entries.
3. Validate your setup via `npm run build` locally. If dynamic routes map properly, it will generate an HTML page corresponding to the `slug`.

## Build and Export Execution (`build-and-export.sh`)
Since the project relies on a strictly `output: 'export'` construct, `npm run build` will generate an independent `out/` directory.

- Next.js traces all dynamic app routes and reads `generateStaticParams()`.
- Markdown is fully embedded within HTML fragments. Mermaid scripts are client-rendered explicitly during page loads.

## GitHub Pages Deployment
Run `npm run deploy` which should trigger `npm run build && npx gh-pages -d out` locally or execute via GitHub Actions `.github/workflows/deploy.yml`. Keep `basePath` inside `next.config.ts` reflective of whether it sits on a custom domain or a repository sub-path.
