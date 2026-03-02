
# 🔧 **PART 1B: Content Manifest & Library Functions**

## **lib/content.ts** - Content Manifest

```typescript
export interface ContentItem {
  slug: string
  title: string
  category: 'foundation' | 'language' | 'frontend' | 'backend' | 'capstone' | 'support'
  order: number
  description: string
  file: string
}

export interface ContentCategory {
  name: string
  slug: string
  items: ContentItem[]
}

export const CONTENT_MANIFEST: ContentItem[] = [
  // Foundation (Order 1-2)
  {
    slug: 'week-01-portfolio',
    title: 'Week 1: Portfolio Website & Git',
    category: 'foundation',
    order: 1,
    description: 'Build portfolio with HTML5, CSS3, GitHub Pages',
    file: 'foundation/week-01.md',
  },
  {
    slug: 'week-02-advanced-css',
    title: 'Week 2: Advanced CSS & Design Systems',
    category: 'foundation',
    order: 2,
    description: 'Flexbox, Grid, animations, accessibility',
    file: 'foundation/week-02.md',
  },

  // Language (Order 3)
  {
    slug: 'javascript-typescript',
    title: 'Weeks 3-4: JavaScript & TypeScript',
    category: 'language',
    order: 3,
    description: 'JS fundamentals, async/await, TypeScript types',
    file: 'language/week-03-04.md',
  },

  // Frontend (Order 4)
  {
    slug: 'react-nextjs',
    title: 'Weeks 5-6: React & Next.js',
    category: 'frontend',
    order: 4,
    description: 'React hooks, Next.js routing, NextAuth',
    file: 'frontend/week-05-06.md',
  },

  // Backend (Order 5)
  {
    slug: 'backend-integration',
    title: 'Weeks 7-12: Backend & Capstone',
    category: 'backend',
    order: 5,
    description: 'Node.js, NestJS, MongoDB, full-stack',
    file: 'backend/week-07-12.md',
  },

  // Capstone (Order 6-9)
  {
    slug: 'capstone-projects',
    title: 'Capstone Projects Overview',
    category: 'capstone',
    order: 6,
    description: 'Three project options overview',
    file: 'capstone/projects.md',
  },
  {
    slug: 'internship-platform',
    title: 'Project 1: Internship Platform',
    category: 'capstone',
    order: 7,
    description: 'Organizations → Students → Job Applications',
    file: 'capstone/project-1.md',
  },
  {
    slug: 'assignment-tracker',
    title: 'Project 2: Assignment Tracking',
    category: 'capstone',
    order: 8,
    description: 'Admin posts → Students submit → Grading',
    file: 'capstone/project-2.md',
  },
  {
    slug: 'college-dashboard',
    title: 'Project 3: College Dashboard',
    category: 'capstone',
    order: 9,
    description: 'Student tracking, placements, analytics',
    file: 'capstone/project-3.md',
  },

  // Support (Order 10-12)
  {
    slug: 'setup-guide',
    title: 'Setup Guide',
    category: 'support',
    order: 10,
    description: 'Tools, project structure, environment',
    file: 'support/setup.md',
  },
  {
    slug: 'internship-diary',
    title: 'Daily Internship Diary',
    category: 'support',
    order: 11,
    description: 'Track daily learning and progress',
    file: 'support/diary.md',
  },
  {
    slug: 'best-practices',
    title: 'Best Practices & Patterns',
    category: 'support',
    order: 12,
    description: 'Git, TypeScript, NestJS, API design',
    file: 'support/materials.md',
  },
]

// Helper functions
export const getContentByCategory = (): ContentCategory[] => {
  const categories: Record<string, ContentItem[]> = {}
  CONTENT_MANIFEST.forEach((item) => {
    if (!categories[item.category]) categories[item.category] = []
    categories[item.category].push(item)
  })
  return Object.entries(categories).map(([slug, items]) => ({
    name: getCategoryName(slug as any),
    slug,
    items: items.sort((a, b) => a.order - b.order),
  }))
}

export const getCategoryName = (category: string): string => {
  const names: Record<string, string> = {
    foundation: 'Foundation',
    language: 'Language Fundamentals',
    frontend: 'Frontend Mastery',
    backend: 'Backend & Integration',
    capstone: 'Capstone Projects',
    support: 'Support Materials',
  }
  return names[category]
}

export const getContentBySlug = (slug: string): ContentItem | undefined => {
  return CONTENT_MANIFEST.find((item) => item.slug === slug)
}

export const getAllSlugs = (): string[] => {
  return CONTENT_MANIFEST.map((item) => item.slug)
}

export const getNextPrevContent = (slug: string) => {
  const index = CONTENT_MANIFEST.findIndex((item) => item.slug === slug)
  return {
    prev: index > 0 ? CONTENT_MANIFEST[index - 1] : undefined,
    next: index < CONTENT_MANIFEST.length - 1 ? CONTENT_MANIFEST[index + 1] : undefined,
  }
}
```

---

## **lib/markdown.ts** - Markdown Processing

```typescript
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

export interface ParsedContent {
  content: string
  metadata: Record<string, any>
}

export async function parseMarkdown(filePath: string): Promise<ParsedContent> {
  const file = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(file)

  // Process markdown → HTML
  const processedContent = await remark()
    .use(remarkHtml)
    .process(content)

  return {
    content: String(processedContent),
    metadata: data,
  }
}

export function getContentPath(file: string): string {
  return path.join(process.cwd(), 'content', file)
}

export async function getMarkdownContent(file: string): Promise<ParsedContent> {
  const filePath = getContentPath(file)
  return parseMarkdown(filePath)
}

// Calculate reading time
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// Extract headings for TOC
export interface Heading {
  level: number
  text: string
  id: string
}

export function extractHeadings(html: string): Heading[] {
  const headingRegex = /<h([1-6])>(.+?)<\/h\1>/g
  const headings: Heading[] = []
  let match

  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1])
    const text = match[2].replace(/<[^>]*>/g, '') // Remove any nested tags
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    headings.push({ level, text, id })
  }

  return headings
}
```

---

## **styles/globals.css** - Global Styles

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Root color variables for future dark mode */
:root {
  /* Primary Colors */
  --color-primary-100: #80dbff;
  --color-primary-default: #2b93bf;
  
  /* Accent Colors */
  --color-accent-green: #25d366;
  --color-accent-red: #c53637;
  --color-accent-blue: #2b93bf;
  
  /* Neutral Colors */
  --color-neutral-50: #f9fafb;
  --color-neutral-100: #f3f4f6;
  --color-neutral-200: #e5e7eb;
  --color-neutral-600: #4b5563;
  --color-neutral-700: #374a5d;
  --color-neutral-800: #192f46;
  --color-neutral-900: #162330;
  
  /* Text */
  --color-text-primary: #192f46;
  --color-text-secondary: #374a5d;
  --color-text-muted: #9ca3af;
  
  /* Background */
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f9fafb;
  --color-bg-tertiary: #f3f4f6;
}

/* Book-like styling */
body {
  @apply font-serif text-neutral-800 bg-white;
  line-height: 1.7;
  letter-spacing: 0.3px;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Anchor link styling for TOC */
a[href^="#"] {
  @apply text-primary-default hover:text-primary-100 transition-colors;
}

/* Code highlighting */
code {
  @apply bg-neutral-50 px-1.5 py-0.5 rounded text-sm font-mono text-accent-red;
}

pre {
  @apply bg-neutral-900 text-white p-4 rounded-lg overflow-x-auto;
}

pre code {
  @apply bg-transparent text-white p-0;
}

/* Blockquote styling */
blockquote {
  @apply border-l-4 border-primary-default pl-4 py-2 italic text-neutral-700 bg-neutral-50 my-4;
}

/* Link styling */
a:not([class]) {
  @apply text-primary-default hover:underline;
}

/* Selection color */
::selection {
  @apply bg-primary-default text-white;
}

/* Print styles for book-like PDF */
@media print {
  @page {
    margin: 2cm;
  }
  body {
    font-size: 12pt;
    line-height: 1.8;
  }
}
```

---