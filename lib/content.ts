export type ContentTrack = 'mern' | 'data-science' | 'cloud-devops'

export interface ContentItem {
    slug: string
    title: string
    track: ContentTrack
    category: 'foundation' | 'language' | 'frontend' | 'backend' | 'capstone' | 'support'
    order: number
    description: string
    file: string
}

export interface ContentCategory {
    name: string
    slug: string
    track: ContentTrack
    items: ContentItem[]
}

// Map exactly to the actual files inside the /content directory
export const CONTENT_MANIFEST: ContentItem[] = [
    // Foundation (Order 1-2)
    {
        slug: 'week-01-portfolio',
        title: 'Week 1: Portfolio Website & Git',
        track: 'mern',
        category: 'foundation',
        order: 1,
        description: 'Build portfolio with HTML5, CSS3, GitHub Pages',
        file: 'mern/WEEK-01.md',
    },
    {
        slug: 'week-02-advanced-css',
        title: 'Week 2: Advanced CSS & Design Systems',
        track: 'mern',
        category: 'foundation',
        order: 2,
        description: 'Flexbox, Grid, animations, accessibility',
        file: 'mern/WEEK-02.md',
    },

    // Language (Order 3)
    {
        slug: 'javascript-typescript',
        title: 'Weeks 3-4: JavaScript & TypeScript',
        track: 'mern',
        category: 'language',
        order: 3,
        description: 'JS fundamentals, async/await, TypeScript types',
        file: 'mern/WEEK-03-04-JAVASCRIPT-TYPESCRIPT.md',
    },

    // Frontend (Order 4)
    {
        slug: 'react-nextjs',
        title: 'Weeks 5-6: React & Next.js',
        track: 'mern',
        category: 'frontend',
        order: 4,
        description: 'React hooks, Next.js routing, NextAuth',
        file: 'mern/WEEK-05-06-REACT-NEXTJS.md',
    },

    // Backend (Order 5)
    {
        slug: 'backend-integration',
        title: 'Weeks 7-12: Backend & Capstone',
        track: 'mern',
        category: 'backend',
        order: 5,
        description: 'Node.js, NestJS, MongoDB, full-stack',
        file: 'mern/WEEK-07-12-BACKEND-INTEGRATION.md',
    },

    // Capstone (Order 6)
    {
        slug: 'capstone-projects',
        title: 'Capstone Projects Specifications',
        track: 'mern',
        category: 'capstone',
        order: 6,
        description: 'Complete requirements for all 3 capstone projects',
        file: 'mern/CAPSTONE-PROJECTS.md',
    },

    // Support (Order 10-12)
    {
        slug: 'setup-guide',
        title: 'Setup Guide',
        track: 'mern',
        category: 'support',
        order: 10,
        description: 'Tools, project structure, environment',
        file: 'mern/SETUP-GUIDE.md',
    },
    {
        slug: 'internship-diary',
        title: 'Daily Internship Diary',
        track: 'mern',
        category: 'support',
        order: 11,
        description: 'Track daily learning and progress',
        file: 'mern/DAILY-INTERNSHIP-DIARY-GUIDE.md',
    },
    {
        slug: 'best-practices',
        title: 'Best Practices & Patterns',
        track: 'mern',
        category: 'support',
        order: 12,
        description: 'Git, TypeScript, NestJS, API design',
        file: 'mern/SUPPORTING-MATERIALS.md',
    },
    {
        slug: 'master-outline',
        title: 'Course Master Outline',
        track: 'mern',
        category: 'support',
        order: 13,
        description: 'The comprehensive syllabus and timeline overview',
        file: 'mern/00-MASTER-OUTLINE.md',
    }
]

// Helper functions
export const getContentByTrack = (track: ContentTrack): ContentCategory[] => {
    const categories: Record<string, ContentItem[]> = {}
    CONTENT_MANIFEST.filter(item => item.track === track).forEach((item) => {
        if (!categories[item.category]) categories[item.category] = []
        categories[item.category].push(item)
    })
    return Object.entries(categories).map(([slug, items]) => ({
        name: getCategoryName(slug as any),
        slug,
        track,
        items: items.sort((a, b) => a.order - b.order),
    }))
}

export const getContentByCategory = (): ContentCategory[] => {
    // Legacy support or fallback
    return getContentByTrack('mern');
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
