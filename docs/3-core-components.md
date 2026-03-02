# 📦 **PART 1C: Core Components**

## **components/MermaidRenderer.tsx** - Render Mermaid Diagrams

```typescript
'use client'

import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

interface MermaidRendererProps {
  chart: string
  id: string
}

export function MermaidRenderer({ chart, id }: MermaidRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const initMermaid = async () => {
      try {
        mermaid.initialize({
          startOnLoad: true,
          theme: 'light',
          securityLevel: 'loose',
          flowchart: {
            useMaxWidth: true,
            padding: 20,
          },
        })

        // Clear previous content
        containerRef.current!.innerHTML = `<div class="mermaid">${chart}</div>`
        await mermaid.contentLoaded()
      } catch (error) {
        console.error('Mermaid rendering error:', error)
        containerRef.current!.innerHTML = '<p class="text-red-500">Failed to render diagram</p>'
      }
    }

    initMermaid()
  }, [chart])

  return (
    <div
      ref={containerRef}
      className="my-6 flex justify-center bg-neutral-50 p-4 rounded-lg border border-neutral-200"
      id={id}
    />
  )
}
```

---

## **components/MarkdownRenderer.tsx** - Convert MD HTML with Mermaid Support

```typescript
'use client'

import { useMemo } from 'react'
import { MermaidRenderer } from './MermaidRenderer'

interface MarkdownRendererProps {
  html: string
}

export function MarkdownRenderer({ html }: MarkdownRendererProps) {
  // Extract and render Mermaid diagrams
  const renderedContent = useMemo(() => {
    const mermaidRegex = /```mermaid\n([\s\S]*?)```/g
    let counter = 0
    const mermaidBlocks: { id: string; chart: string }[] = []

    // Extract mermaid blocks
    let processedHtml = html.replace(mermaidRegex, (match, chart) => {
      const id = `mermaid-${counter}`
      mermaidBlocks.push({ id, chart: chart.trim() })
      counter++
      return `<div id="${id}" data-mermaid="true"></div>`
    })

    return { processedHtml, mermaidBlocks }
  }, [html])

  return (
    <div className="prose prose-neutral max-w-none">
      {/* Render HTML */}
      <div
        className="prose-content"
        dangerouslySetInnerHTML={{ __html: renderedContent.processedHtml }}
      />

      {/* Render Mermaid diagrams */}
      {renderedContent.mermaidBlocks.map(({ id, chart }) => (
        <MermaidRenderer key={id} id={id} chart={chart} />
      ))}
    </div>
  )
}
```

---

## **components/TableOfContents.tsx** - TOC with Scroll Progress

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
    // Observer for scroll position
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

    // Observe all headings
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav className="hidden xl:block fixed right-8 top-32 w-48">
      <div className="sticky top-32">
        <h3 className="text-sm font-semibold text-neutral-900 mb-3 uppercase tracking-wide">
          On This Page
        </h3>

        <ul className="space-y-2 text-sm">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={`
                transition-all duration-200
                ${heading.level === 2 ? 'ml-0' : 'ml-4'}
              `}
            >
              
                href={`#${heading.id}`}
                className={`
                  block py-1 px-2 rounded transition-colors
                  ${
                    activeId === heading.id
                      ? 'bg-primary-100 text-primary-default font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
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

## **components/Sidebar.tsx** - Navigation Sidebar

```typescript
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ContentCategory, getCategoryName } from '@/lib/content'

interface SidebarProps {
  categories: ContentCategory[]
  currentSlug?: string
}

export function Sidebar({ categories, currentSlug }: SidebarProps) {
  const [expandedCategory, setExpandedCategory] = useState<string>('foundation')

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-neutral-50 border-r border-neutral-200 overflow-y-auto pt-20 pb-8">
      <div className="px-6">
        {/* Logo/Title */}
        <div className="mb-8">
          <Link href="/">
            <h1 className="text-xl font-bold text-neutral-900">MERN Course</h1>
            <p className="text-xs text-neutral-600 mt-1">12-Week Learning Path</p>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {categories.map((category) => (
            <div key={category.slug}>
              {/* Category Header */}
              <button
                onClick={() =>
                  setExpandedCategory(
                    expandedCategory === category.slug ? '' : category.slug
                  )
                }
                className="w-full text-left py-2 px-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-200 rounded transition-colors uppercase tracking-wide"
              >
                {category.name}
              </button>

              {/* Category Items */}
              {expandedCategory === category.slug && (
                <ul className="ml-2 space-y-1 border-l-2 border-primary-default pl-3">
                  {category.items.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/content/${item.slug}/`}
                        className={`
                          block py-1.5 px-2 rounded text-sm transition-colors
                          ${
                            currentSlug === item.slug
                              ? 'bg-primary-default text-white font-semibold'
                              : 'text-neutral-700 hover:bg-neutral-200 hover:text-neutral-900'
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

        {/* Footer */}
        <div className="mt-8 pt-8 border-t border-neutral-200 text-xs text-neutral-600">
          <p>12-week MERN Stack Course</p>
          <p className="mt-2">Book-like learning experience</p>
        </div>
      </div>
    </aside>
  )
}
```

---

## **components/Navigation.tsx** - Prev/Next Buttons

```typescript
import Link from 'next/link'
import { ContentItem } from '@/lib/content'

interface NavigationProps {
  prev?: ContentItem
  next?: ContentItem
}

export function Navigation({ prev, next }: NavigationProps) {
  return (
    <div className="mt-12 pt-8 border-t border-neutral-200 grid grid-cols-2 gap-4">
      {/* Previous */}
      {prev ? (
        <Link
          href={`/content/${prev.slug}/`}
          className="p-4 rounded-lg border border-neutral-200 hover:border-primary-default hover:bg-neutral-50 transition-colors group"
        >
          <p className="text-xs font-semibold text-neutral-600 mb-1">← Previous</p>
          <p className="text-sm font-semibold text-neutral-900 group-hover:text-primary-default">
            {prev.title}
          </p>
        </Link>
      ) : (
        <div />
      )}

      {/* Next */}
      {next ? (
        <Link
          href={`/content/${next.slug}/`}
          className="p-4 rounded-lg border border-neutral-200 hover:border-primary-default hover:bg-neutral-50 transition-colors group text-right"
        >
          <p className="text-xs font-semibold text-neutral-600 mb-1">Next →</p>
          <p className="text-sm font-semibold text-neutral-900 group-hover:text-primary-default">
            {next.title}
          </p>
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}
```

---

## **components/Breadcrumb.tsx** - Breadcrumb Navigation

```typescript
import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="text-sm mb-6 flex items-center space-x-2">
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center space-x-2">
          <Link
            href={item.href}
            className={`
              transition-colors
              ${
                index === items.length - 1
                  ? 'text-neutral-600 cursor-default'
                  : 'text-primary-default hover:text-primary-100'
              }
            `}
          >
            {item.label}
          </Link>
          {index < items.length - 1 && <span className="text-neutral-400">/</span>}
        </div>
      ))}
    </nav>
  )
}
```

---

## **File Structure Update**

```
components/
├── Sidebar.tsx           ✅ Navigation sidebar
├── TableOfContents.tsx   ✅ TOC with scroll
├── MarkdownRenderer.tsx  ✅ MD → HTML + Mermaid
├── MermaidRenderer.tsx   ✅ Mermaid diagram renderer
├── Navigation.tsx        ✅ Prev/Next buttons
└── Breadcrumb.tsx        ✅ Breadcrumb nav
```

---

## ✅ **Part 1C Summary**

- ✅ **MermaidRenderer** - Renders Mermaid diagrams as SVG
- ✅ **MarkdownRenderer** - Converts markdown HTML with Mermaid support
- ✅ **TableOfContents** - Auto-scrolling TOC with progress tracking
- ✅ **Sidebar** - Expandable category navigation
- ✅ **Navigation** - Prev/Next page buttons
- ✅ **Breadcrumb** - Navigation breadcrumbs

---