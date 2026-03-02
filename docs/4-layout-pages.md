# 🎨 **PART 1D: Layout & Page Templates**

## **app/layout.tsx** - Root Layout

```typescript
import type { Metadata } from 'next'
import './globals.css'
import { Sidebar } from '@/components/Sidebar'
import { getContentByCategory } from '@/lib/content'

export const metadata: Metadata = {
  title: 'MERN Stack Course - 12 Week Learning Path',
  description: 'Complete MERN Stack course from beginner to internship-ready developer',
  viewport: 'width=device-width, initial-scale=1',
  authors: [{ name: 'MERN Course Team' }],
  keywords: ['MERN', 'React', 'Node.js', 'MongoDB', 'Full Stack', 'Web Development'],
  openGraph: {
    title: 'MERN Stack Course - 12 Week Learning Path',
    description: 'Transform from beginner to internship-ready full-stack developer',
    type: 'website',
    url: 'https://yourdomain.com',
  },
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
        <div className="flex">
          {/* Sidebar */}
          <Sidebar categories={categories} />

          {/* Main Content */}
          <main className="ml-64 pt-16 pb-16 min-h-screen flex-1">
            <div className="max-w-4xl mx-auto px-8 py-8">{children}</div>
          </main>
        </div>

        {/* Footer */}
        <footer className="ml-64 border-t border-neutral-200 bg-neutral-50 py-8 px-8">
          <div className="max-w-4xl mx-auto text-center text-sm text-neutral-600">
            <p>© 2024 MERN Stack Course. All rights reserved.</p>
            <p className="mt-2">Book-like learning experience for aspiring full-stack developers</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
```

---

## **app/page.tsx** - Home Page

```typescript
import Link from 'next/link'
import { CONTENT_MANIFEST, getContentByCategory } from '@/lib/content'

export default function HomePage() {
  const categories = getContentByCategory()
  const featuredContent = CONTENT_MANIFEST.slice(0, 4)

  return (
    <div>
      {/* Hero Section */}
      <section className="mb-16">
        <h1 className="text-5xl font-bold text-neutral-900 mb-4">
          12-Week MERN Stack Course
        </h1>
        <p className="text-xl text-neutral-700 mb-6 max-w-2xl">
          Transform from a beginner to an internship-ready full-stack developer. 
          Learn HTML, CSS, JavaScript, TypeScript, React, Next.js, Node.js, and MongoDB through 
          structured learning and capstone projects.
        </p>
        <div className="flex gap-4">
          <Link
            href={`/content/${CONTENT_MANIFEST[0].slug}/`}
            className="px-6 py-3 bg-primary-default text-white rounded-lg hover:bg-primary-100 transition-colors font-semibold"
          >
            Start Learning
          </Link>
          <Link
            href="#curriculum"
            className="px-6 py-3 border-2 border-primary-default text-primary-default rounded-lg hover:bg-neutral-50 transition-colors font-semibold"
          >
            View Curriculum
          </Link>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="mb-16 grid grid-cols-3 gap-6">
        <div className="p-6 bg-neutral-50 rounded-lg border border-neutral-200">
          <div className="text-3xl font-bold text-primary-default mb-2">12</div>
          <div className="text-sm text-neutral-600">Weeks of Learning</div>
        </div>
        <div className="p-6 bg-neutral-50 rounded-lg border border-neutral-200">
          <div className="text-3xl font-bold text-primary-default mb-2">3</div>
          <div className="text-sm text-neutral-600">Capstone Projects</div>
        </div>
        <div className="p-6 bg-neutral-50 rounded-lg border border-neutral-200">
          <div className="text-3xl font-bold text-primary-default mb-2">7</div>
          <div className="text-sm text-neutral-600">Core Technologies</div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">Get Started</h2>
        <div className="grid grid-cols-2 gap-6">
          {featuredContent.map((item) => (
            <Link
              key={item.slug}
              href={`/content/${item.slug}/`}
              className="p-6 bg-neutral-50 rounded-lg border border-neutral-200 hover:border-primary-default hover:shadow-md transition-all group"
            >
              <div className="text-xs font-semibold text-primary-default mb-2 uppercase tracking-wide">
                {item.category}
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-default transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-600">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Curriculum Overview */}
      <section id="curriculum" className="mb-16">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">Complete Curriculum</h2>

        {categories.map((category) => (
          <div key={category.slug} className="mb-10">
            <h3 className="text-xl font-bold text-neutral-900 mb-4 uppercase tracking-wide text-primary-default">
              {category.name}
            </h3>
            <ul className="space-y-2 ml-4 border-l-4 border-primary-default pl-6">
              {category.items.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/content/${item.slug}/`}
                    className="text-neutral-700 hover:text-primary-default transition-colors font-medium"
                  >
                    {item.title}
                  </Link>
                  <p className="text-sm text-neutral-600 mt-1">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Key Features */}
      <section className="mb-16 bg-neutral-50 p-8 rounded-lg border border-neutral-200">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Why This Course?</h2>
        <ul className="space-y-3 text-neutral-700">
          <li className="flex items-start gap-3">
            <span className="text-primary-default font-bold">✓</span>
            <span>
              <strong>Comprehensive:</strong> From HTML/CSS to full MERN stack development
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-default font-bold">✓</span>
            <span>
              <strong>Practical:</strong> Real-world projects and internship diary tracking
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-default font-bold">✓</span>
            <span>
              <strong>Structured:</strong> 12-week learning path with clear milestones
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-default font-bold">✓</span>
            <span>
              <strong>TypeScript Focus:</strong> Modern, type-safe development practices
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-default font-bold">✓</span>
            <span>
              <strong>Internship Ready:</strong> Portfolio projects that impress employers
            </span>
          </li>
        </ul>
      </section>
    </div>
  )
}
```

---

## **app/(content)/[slug]/page.tsx** - Content Page Template

```typescript
import { notFound } from 'next/navigation'
import { getContentBySlug, getAllSlugs, getNextPrevContent, getContentByCategory } from '@/lib/content'
import { getMarkdownContent, extractHeadings } from '@/lib/markdown'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { TableOfContents } from '@/components/TableOfContents'
import { Navigation } from '@/components/Navigation'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Sidebar } from '@/components/Sidebar'

// Generate static params for all content
export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const content = getContentBySlug(slug)

  if (!content) {
    return { title: 'Not Found' }
  }

  return {
    title: `${content.title} | MERN Course`,
    description: content.description,
    openGraph: {
      title: content.title,
      description: content.description,
      type: 'article',
    },
  }
}

export default async function ContentPage({ params }: PageProps) {
  const { slug } = await params
  const contentItem = getContentBySlug(slug)

  if (!contentItem) {
    notFound()
  }

  // Load markdown content
  let html = ''
  let headings = []
  try {
    const parsed = await getMarkdownContent(contentItem.file)
    html = parsed.content
    headings = extractHeadings(html)
  } catch (error) {
    console.error(`Failed to load content for ${slug}:`, error)
    return <div className="text-accent-red">Failed to load content</div>
  }

  // Get navigation
  const { prev, next } = getNextPrevContent(slug)
  const categories = getContentByCategory()

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar categories={categories} currentSlug={slug} />

      {/* Main Content */}
      <main className="ml-64 pt-16 pb-16 min-h-screen flex-1">
        <div className="max-w-4xl mx-auto px-8 py-8">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              {
                label: contentItem.category,
                href: `#${contentItem.category}`,
              },
              { label: contentItem.title, href: `#` },
            ]}
          />

          {/* Header */}
          <header className="mb-8">
            <div className="text-xs font-semibold text-primary-default mb-2 uppercase tracking-wide">
              {contentItem.category}
            </div>
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">{contentItem.title}</h1>
            <p className="text-lg text-neutral-700">{contentItem.description}</p>
          </header>

          {/* Content */}
          <article className="prose prose-neutral max-w-none mb-12">
            <MarkdownRenderer html={html} />
          </article>

          {/* Table of Contents (Side) */}
          {headings.length > 0 && <TableOfContents headings={headings} />}

          {/* Navigation */}
          <Navigation prev={prev} next={next} />
        </div>
      </main>
    </div>
  )
}
```

---

## **app/not-found.tsx** - 404 Page

```typescript
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-neutral-900 mb-4">404</h1>
        <p className="text-xl text-neutral-700 mb-8">Page not found</p>
        <Link
          href="/"
          className="px-6 py-3 bg-primary-default text-white rounded-lg hover:bg-primary-100 transition-colors font-semibold"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
```

---

## **app/loading.tsx** - Loading State

```typescript
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse">
        <div className="h-12 bg-neutral-200 rounded-lg w-96 mb-4"></div>
        <div className="h-6 bg-neutral-200 rounded-lg w-full mb-8"></div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-neutral-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

---

## **app/error.tsx** - Error Boundary

```typescript
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold text-accent-red mb-4">Something went wrong</h1>
        <p className="text-neutral-700 mb-8">{error.message || 'An unexpected error occurred'}</p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-primary-default text-white rounded-lg hover:bg-primary-100 transition-colors font-semibold"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
```

---

## **File Structure Update**

```
app/
├── layout.tsx                    ✅ Root layout with sidebar
├── page.tsx                      ✅ Home page
├── not-found.tsx                 ✅ 404 page
├── loading.tsx                   ✅ Loading skeleton
├── error.tsx                     ✅ Error boundary
├── globals.css                   ✅ Global styles
└── (content)/
    └── [slug]/
        └── page.tsx              ✅ Content template
```

---

## ✅ **Part 1D Summary**

- ✅ **Root Layout** - Sidebar + main content area
- ✅ **Home Page** - Hero, stats, curriculum overview
- ✅ **Content Page** - Dynamic routing with markdown
- ✅ **Not Found** - 404 page
- ✅ **Loading** - Skeleton loader
- ✅ **Error** - Error boundary

---
