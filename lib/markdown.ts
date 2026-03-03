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
