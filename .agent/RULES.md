# Development Rules & Constrains - MERN Course Static Site

## Project Constraints

1. **Strict Typescript**:
   - Every JS file must be `.ts` or `.tsx`.
   - Strict TS mode enabled. Absolutely no `any` casting allowed.
2. **Styling Strictness (Tailwind & palette.css ONLY)**:
   - YOU MUST NOT arbitrarily devise colors. Always trace styling back to `palette.css` values.
   - Primary defaults:
     - `primary-default`: `#2b93bf` / `primary-100`: `#80dbff`
     - `neutral-50`: `#f9fafb` / `neutral-800`: `#192f46` / `neutral-900`: `#162330`
     - `accent-green`: `#25d366` / `accent-red`: `#c53637`
   - Single source of truth is `tailwind.config.ts`.
3. **Next.js & App Router (`nextjs-best-practices` skill)**
   - All interactive UI logic to be localized to minimal leaf node `'use client'` components.
   - Use `generateStaticParams()` to ensure full compatibility with `output: 'export'`.
   - Dynamic data endpoints (or uncacheable fetches) are forbidden.

## Design Systems Architecture (`tailwind-design-system` skill)

1. **Tokens Hierarchy**:
   - Variables should be configured as CSS variables in `globals.css` that map exactly to our hex values in `palette.css`.
   - Map Tailwind configs (`theme.colors.primary`, `theme.colors.neutral`) explicitly to these CSS variables.
2. **Component Abstractions**:
   - Rely heavily on `cva` (Class Variance Authority) for generating variants on complex components like Buttons, Badges, etc.
   - Utilize Compound Components (e.g. `Card`, `CardHeader`, `CardTitle`).

## Content Development

- Source of truth for content is the `lib/content.ts` mapping and its relative `/content/` markdown files.
- Ensure all diagrams match standard Mermaid code blocks.
- All markdown processing strictly occurs during static generation, not at run-time.
