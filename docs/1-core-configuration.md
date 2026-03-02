
# 🚀 **PART 1A: Static Site Configuration**

## **next.config.ts**
```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '',
  trailingSlash: true,
}

export default nextConfig
```

## **tsconfig.json**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "baseUrl": ".",
    "paths": { "@/*": ["./*"] }
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

## **package.json**
```json
{
  "name": "mern-course-static",
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  },
  "dependencies": {
    "next": "^16.1.0",
    "react": "^19.0.0",
    "remark": "^15.0.0",
    "remark-html": "^16.0.0",
    "mermaid": "^10.6.0",
    "gray-matter": "^4.0.3"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "@tailwindcss/typography": "^0.5.0"
  }
}
```

## **tailwind.config.ts** (Single CSS Control Point)
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Palette.css mapped
        primary: { 100: '#80dbff', DEFAULT: '#2b93bf' },
        accent: { green: '#25d366', red: '#c53637' },
        neutral: { 50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 800: '#192f46', 900: '#162330' },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#192f46',
            a: { color: '#2b93bf' },
            h1: { color: '#192f46' },
            code: { color: '#c53637', backgroundColor: '#f9fafb' },
            pre: { backgroundColor: '#162330', color: '#fff' },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
```

## **Folder Structure**
```
mern-course/
├── .agent/
│   ├── AGENTS.md
│   ├── RULES.md
│   └── workflow.md
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── (content)/[slug]/page.tsx
├── components/
│   ├── Sidebar.tsx
│   ├── MermaidRenderer.tsx
│   └── MarkdownRenderer.tsx
├── content/
│   ├── foundation/week-01.md
│   ├── language/week-03-04.md
│   ├── frontend/week-05-06.md
│   ├── backend/week-07-12.md
│   ├── capstone/projects.md
│   └── support/setup.md
├── lib/
│   ├── content.ts (manifest)
│   └── markdown.ts (processor)
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---