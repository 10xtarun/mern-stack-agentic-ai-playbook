# MERN Course Static Site - Agent Configuration

## Overview

Based on context from `README.md` and `MAIN_DOC.md`:
We are building a comprehensive 12-week MERN Stack course delivered as a seamlessly integrated static book-like site. The course covers HTML/CSS foundations, JS/TS, React/Next.js, Node/NestJS backend integrations, 3 capstone specs, and an explicit Daily Internship Diary system.

This is a static Next.js site using:
- **Framework**: Next.js 16+ (App Router, strict Server vs Client Separation)
- **Styling**: Tailwind CSS
- **Content**: Markdown files (parsed via Remark/Unified) located in `/content/` featuring Mermaid diagram integration.
- **Rendering**: Fully static export targeting GitHub Pages (`output: 'export'`).

## Strict Color Palette

The colors MUST STRICTLY conform to `palette.css` values. DO NOT use generic Tailwind default colors.
- **Primary / Brand**: `#2b93bf` (`--steelblue-100`), `#80dbff` (`--skyblue-100`)
- **Accent**: `#25d366` (`--mediumspringgreen-100`), `#c53637` (`--firebrick-100`)
- **Neutrals**: `#f9fafb`, `#f3f4f6`, `#e5e7eb`, `#192f46`, `#162330`

## Key Principles & Best Practices
1. **App Router & Server Components**: Server components are strictly default. Explicit `'use client'` should be kept minimal and only used for direct interactivity.
2. **Book-like Aesthetics**: The focus is a readable, typography-heavy design tailored to learners, incorporating the defined `palette.css` variables into Custom Properties mapping (`--color-*`).
3. **No Database Dependencies**: It is strictly a static SSG application. Routes are configured via `CONTENT_MANIFEST` with `generateStaticParams()`.
4. **Tailwind Design System Rules**: Employ design token mapping (abstract → semantic) strictly matching the palette mapping, build reusable compound components rather than scattered utility classes, limit ad-hoc `@apply` usage. Follow `tailwind-design-system` skill guidelines.

## File Organization & Directories
```
.agent/                 # Agent logic & guidelines
app/                    # Next.js App routing
components/             # UI Components (Sidebar, renderers, navigation)
lib/                    # App Logic (content manifest, markdown parsers)
content/                # Source content markdown
```

# Always follow following files for proper and correct references:
1. .agent/AGENTS.md
2. .agent/palette.css
3. .agent/RULES.md
4. .agent/workflow.md
5. .agent/skills/nextjs-best-practices.md
6. .agent/skills/tailwind-design-system.md
7. docs/1-core-configuration.md
8. docs/2-manifest-and-library-functions.md
9. docs/3-core-components.md
10. docs/4-layout-pages.md
11. docs/5-responsive-design.md
12. README.md
