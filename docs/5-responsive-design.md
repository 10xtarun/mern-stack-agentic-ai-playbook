
# 📱 **RESPONSIVE DESIGN UPDATE**

## **tailwind.config.ts** - Updated with Mobile-First Breakpoints

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        // Mobile-first (default) + Tablet
        // sm: '640px',   (not needed - use default)
        // md: '768px',   (not needed)
        lg: '1024px',  // Desktop breakpoint
        xl: '1280px',  // Large desktop
      },
      colors: {
        primary: { 100: '#80dbff', DEFAULT: '#2b93bf' },
        accent: { green: '#25d366', red: '#c53637' },
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          600: '#4b5563',
          700: '#374a5d',
          800: '#192f46',
          900: '#162330',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#192f46',
            a: { color: '#2b93bf' },
            h1: { fontSize: '2rem' },
            h2: { fontSize: '1.5rem' },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
```

---

## **app/layout.tsx** - Mobile-Responsive Layout

```typescript
import type { Metadata } from 'next'
import './globals.css'
import { Sidebar } from '@/components/Sidebar'
import { getContentByCategory } from '@/lib/content'

export const metadata: Metadata = {
  title: 'MERN Stack Course',
  description: 'Complete MERN Stack course - 12 weeks to internship-ready',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = getContentByCategory()

  return (
    <html lang="en">
      <body className="bg-white text-neutral-900">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar - Hidden on mobile/tablet, visible on desktop */}
          <div className="hidden lg:block fixed left-0 top-0 h-screen w-64 border-r border-neutral-200">
            <Sidebar categories={categories} />
          </div>

          {/* Main Content */}
          <main className="w-full lg:ml-64 pt-16 lg:pt-8 pb-16 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
              {children}
            </div>
          </main>
        </div>

        {/* Footer */}
        <footer className="lg:ml-64 border-t border-neutral-200 bg-neutral-50 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center text-xs lg:text-sm text-neutral-600">
            <p>© 2024 MERN Stack Course</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
```

---

## **components/Sidebar.tsx** - Mobile-Responsive

```typescript
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ContentCategory } from '@/lib/content'

interface SidebarProps {
  categories: ContentCategory[]
  currentSlug?: string
}

export function Sidebar({ categories, currentSlug }: SidebarProps) {
  const [expandedCategory, setExpandedCategory] = useState<string>('foundation')

  return (
    <aside className="h-full w-full overflow-y-auto pt-20 pb-8 px-4 sm:px-6 lg:px-4">
      {/* Logo */}
      <div className="mb-8">
        <Link href="/">
          <h1 className="text-lg lg:text-xl font-bold text-neutral-900">MERN Course</h1>
          <p className="text-xs text-neutral-600 mt-1">12-Week Path</p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {categories.map((category) => (
          <div key={category.slug}>
            <button
              onClick={() =>
                setExpandedCategory(
                  expandedCategory === category.slug ? '' : category.slug
                )
              }
              className="w-full text-left py-2 px-3 text-xs lg:text-sm font-semibold text-neutral-900 hover:bg-neutral-200 rounded uppercase tracking-wide"
            >
              {category.name}
            </button>

            {expandedCategory === category.slug && (
              <ul className="ml-2 space-y-1 border-l-2 border-primary-default pl-3">
                {category.items.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/content/${item.slug}/`}
                      className={`
                        block py-1.5 px-2 rounded text-xs lg:text-sm transition-colors
                        ${
                          currentSlug === item.slug
                            ? 'bg-primary-default text-white font-semibold'
                            : 'text-neutral-700 hover:bg-neutral-200'
                        }
                      `}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}
```

---

## **components/TableOfContents.tsx** - Responsive TOC

```typescript
'use client'

import { useEffect, useState } from 'react'

export interface Heading {
  level: number
  text: string
  id: string
}

interface TableOfContentsProps {
  headings: Heading[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '0px 0px -80% 0px' }
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  // Hidden on mobile/tablet, visible on large screens
  return (
    <nav className="hidden lg:block fixed right-8 top-32 w-48">
      <div className="sticky top-32">
        <h3 className="text-sm font-semibold text-neutral-900 mb-3 uppercase tracking-wide">
          On This Page
        </h3>

        <ul className="space-y-2 text-xs lg:text-sm">
          {headings.map((heading) => (
            <li key={heading.id} className={heading.level === 2 ? 'ml-0' : 'ml-4'}>
              
                href={`#${heading.id}`}
                className={`
                  block py-1 px-2 rounded transition-colors
                  ${
                    activeId === heading.id
                      ? 'bg-primary-100 text-primary-default font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }
                `}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
```

---

## **app/page.tsx** - Responsive Home

```typescript
import Link from 'next/link'
import { CONTENT_MANIFEST, getContentByCategory } from '@/lib/content'

export default function HomePage() {
  const categories = getContentByCategory()
  const featuredContent = CONTENT_MANIFEST.slice(0, 4)

  return (
    <div>
      {/* Hero */}
      <section className="mb-12 lg:mb-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
          12-Week MERN Stack
        </h1>
        <p className="text-base sm:text-lg text-neutral-700 mb-6 max-w-2xl">
          Learn full-stack development: HTML, CSS, JavaScript, TypeScript, React, Next.js, Node.js, MongoDB.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`/content/${CONTENT_MANIFEST[0].slug}/`}
            className="px-6 py-3 bg-primary-default text-white rounded-lg hover:bg-primary-100 font-semibold text-center"
          >
            Start Learning
          </Link>
          <Link
            href="#curriculum"
            className="px-6 py-3 border-2 border-primary-default text-primary-default rounded-lg hover:bg-neutral-50 font-semibold text-center"
          >
            View Curriculum
          </Link>
        </div>
      </section>

      {/* Stats - Stack on mobile, grid on desktop */}
      <section className="mb-12 lg:mb-16 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
        <div className="p-6 bg-neutral-50 rounded-lg border border-neutral-200">
          <div className="text-2xl lg:text-3xl font-bold text-primary-default mb-2">12</div>
          <div className="text-sm text-neutral-600">Weeks</div>
        </div>
        <div className="p-6 bg-neutral-50 rounded-lg border border-neutral-200">
          <div className="text-2xl lg:text-3xl font-bold text-primary-default mb-2">3</div>
          <div className="text-sm text-neutral-600">Projects</div>
        </div>
        <div className="p-6 bg-neutral-50 rounded-lg border border-neutral-200">
          <div className="text-2xl lg:text-3xl font-bold text-primary-default mb-2">7</div>
          <div className="text-sm text-neutral-600">Technologies</div>
        </div>
      </section>

      {/* Featured - 1 col mobile, 2 col desktop */}
      <section className="mb-12 lg:mb-16">
        <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-6">Get Started</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {featuredContent.map((item) => (
            <Link
              key={item.slug}
              href={`/content/${item.slug}/`}
              className="p-6 bg-neutral-50 rounded-lg border border-neutral-200 hover:border-primary-default transition-all"
            >
              <div className="text-xs font-semibold text-primary-default mb-2 uppercase">
                {item.category}
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-600">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Curriculum - Full width */}
      <section id="curriculum">
        <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-6">
          Complete Curriculum
        </h2>
        {categories.map((category) => (
          <div key={category.slug} className="mb-8">
            <h3 className="text-lg lg:text-xl font-bold text-primary-default mb-4 uppercase">
              {category.name}
            </h3>
            <ul className="space-y-2 ml-4 border-l-4 border-primary-default pl-4 lg:pl-6">
              {category.items.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/content/${item.slug}/`}
                    className="text-neutral-700 hover:text-primary-default font-medium"
                  >
                    {item.title}
                  </Link>
                  <p className="text-xs lg:text-sm text-neutral-600 mt-1">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  )
}
```

---

## **Responsive Breakpoints Summary**

| Device | Width | Sidebar | TOC | Layout |
|--------|-------|---------|-----|--------|
| Mobile | < 640px | Hidden | Hidden | Single col |
| Tablet | 640-1023px | Hidden | Hidden | Single col |
| Desktop | ≥ 1024px | Fixed left | Fixed right | 3-col |

**Tailwind Classes Used**:
- `hidden lg:block` - Hide on mobile/tablet, show on desktop
- `grid grid-cols-1 lg:grid-cols-2` - 1 col mobile, 2 col desktop
- `px-4 sm:px-6 lg:px-8` - Responsive padding
- `text-base sm:text-lg lg:text-xl` - Responsive text

---

## **Part 2A: Content Migration**

```bash
# 1. Create content structure
mkdir -p content/{foundation,language,frontend,backend,capstone,support}

# 2. Move your markdown files
# Content structure:
# content/foundation/week-01.md
# content/language/week-03-04.md
# content/frontend/week-05-06.md
# content/backend/week-07-12.md
# content/capstone/projects.md
# content/capstone/project-1.md
# content/support/setup.md
# content/support/diary.md
```
