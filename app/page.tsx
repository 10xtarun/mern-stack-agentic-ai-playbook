import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { CONTENT_MANIFEST } from "@/lib/content";

import MermaidInit from "@/components/MermaidInit";

async function getMarkdownContent(filename: string) {
  const fullPath = path.join(process.cwd(), "content", filename);
  let fileContents = "";
  try {
    fileContents = fs.readFileSync(fullPath, "utf8");
  } catch (error) {
    console.error(`Error reading file ${filename}:`, error);
    return "";
  }
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  let contentHtml = processedContent.toString();

  // 0. Process internal markdown links to anchor hash links
  contentHtml = contentHtml.replace(/href="([./]*)([^"#]+)(#[^"]*)?"/g, (match, prefix, filename, hash) => {
    if (filename.toLowerCase().endsWith('.md')) {
      const manifestItem = CONTENT_MANIFEST.find(item => item.file === filename);
      if (manifestItem) {
        // If the link has a specific section hash (like #hero) inside the document, 
        // go directly to that hash on the single page. 
        // Otherwise, jump to the start of the week's section.
        return `href="${hash ? hash : '#' + manifestItem.slug}"`;
      }
    }
    return match;
  });

  // 1. Process Citations (References)
  contentHtml = contentHtml.replace(/\[\^(\d+)\](?!\:)/g, '<a href="#cite-$1" class="text-primary font-bold hover:underline" title="Go to citation $1"><sup>[$1]</sup></a>');

  // 2. Process Citations (Definitions)
  // First, let's remove the `<p>` and `</p>` wrappers around citation blocks so they can render natively as block elements
  contentHtml = contentHtml.replace(/<p>\s*(\[\^\d+\]:[\s\S]*?)\s*<\/p>/g, '$1');

  contentHtml = contentHtml.replace(/\[\^(\d+)\]:\s*([\s\S]*?)(?=\[\^\d+\]:|$|<h|<p>|<ul|<ol|<div)/gi, (match, id, text) => {
    // Strip trailing newlines or `<br>` tags that remark adds within contiguous blocks
    let rawText = text.replace(/<br\s*\/?>/gi, '').trim();
    let linkifiedText = rawText;
    if (!rawText.includes('<a ')) {
      linkifiedText = rawText.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" class="text-primary hover:text-primary-hover hover:underline transition-colors break-all" rel="noopener noreferrer">$1</a>');
    }
    return `<div id="cite-${id}" class="citation mt-4 p-4 bg-foreground/5 rounded-xl border border-foreground/10 flex flex-col sm:flex-row gap-3 break-words transition-all hover:bg-foreground/10 hover:border-foreground/20">
          <span class="font-bold text-primary bg-primary/10 rounded-full h-8 w-8 flex items-center justify-center shrink-0">[${id}]</span>
          <div class="flex-1 text-sm"><span class="font-medium opacity-90 block mb-1">${linkifiedText}</span></div>
      </div>`;
  });

  // 3. Process Images (Smart Grids for Consecutive Images and Styling for Singles)
  contentHtml = contentHtml.replace(/(?:<p>\s*(?:<img[^>]+>\s*(?:<br\s*\/?>)?\s*)+\s*<\/p>\s*)+/g, (match) => {
    const imgTags = match.match(/<img[^>]+>/g);
    if (!imgTags) return match;

    // Single standalone image
    if (imgTags.length === 1) {
      const styledImg = imgTags[0].replace('<img', '<img class="w-full max-w-4xl mx-auto rounded-xl shadow-lg border border-foreground/10 my-10 object-cover transition-all hover:shadow-2xl hover:scale-[1.01] duration-300"');
      return styledImg;
    }

    // Multiple images (Grid layout)
    let gridClass = "grid grid-cols-1 md:grid-cols-2 gap-6 my-10 w-full";
    // Check if odd number of images and >= 3 to use a 3-col layout
    if (imgTags.length >= 3 && imgTags.length % 2 !== 0) {
      gridClass = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10 w-full";
    }

    const styledImgs = imgTags.map(img => img.replace('<img', '<img class="w-full h-full min-h-[250px] max-h-[350px] object-cover rounded-xl shadow-md border border-foreground/10 transition-transform hover:scale-[1.02] duration-300 hover:shadow-xl"')).join('');

    return `<div class="${gridClass}">${styledImgs}</div>`;
  });

  // 3. Process Mermaid Diagrams
  contentHtml = contentHtml.replace(/<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g, (match, code) => {
    const unescaped = code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    return `<div class="mermaid flex justify-center my-8 bg-foreground/5 p-8 rounded-xl overflow-x-auto w-full">${unescaped}</div>`;
  });

  // 4. Process Simple Tables (Fallback since no remark-gfm is available)
  // remark-html sometimes concatenates table rows into a single <p> tag line if they are tightly packed.
  // We need to support both multi-line formatting and single-line squished formatting.
  contentHtml = contentHtml.replace(/<p>(\|[\s\S]*?\|)<\/p>/g, (match, tableContent) => {
    // Split rows either by newlines OR by `| |` boundaries that indicate squished rows
    let lines = tableContent.trim().split(/\n|\|\s+(?=\|)/).map((r: string) => r.trim());

    // Ensure all lines still start and end with pipes if they were split by squished spaces
    lines = lines.map((r: string, idx: number) => {
      let formatted = r;
      if (idx > 0 && !formatted.startsWith('|')) formatted = '| ' + formatted;
      if (idx < lines.length - 1 && !formatted.endsWith('|')) formatted = formatted + ' |';
      return formatted;
    });

    if (lines.length < 2 || !lines[1].includes('-')) return match;

    let html = '<div class="overflow-x-auto my-8"><table class="w-full text-left border-collapse text-sm min-w-max">';
    lines.forEach((row: string, i: number) => {
      if (i === 1) return; // Skip Markdown divider row `|---|`

      row = row.replace(/<br\s*\/?>$/, '').trim();
      const rowContent = row.replace(/^\||\|$/g, '');
      const cells = rowContent.split('|').map((c: string) => c.trim());

      const isHeader = i === 0;
      const tag = isHeader ? 'th' : 'td';

      html += `<tr class="border-b border-foreground/10 hover:bg-foreground/5 transition-colors ${isHeader ? 'bg-foreground/5' : ''}">`;
      cells.forEach((cell: string) => {
        html += `<${tag} class="p-4 ${isHeader ? 'font-bold' : ''}">${cell}</${tag}>`;
      });
      html += '</tr>';
    });
    html += '</table></div>';
    return html;
  });

  return contentHtml;
}

export default async function Home() {
  // Pre-fetch all markdown content
  const sectionsContent = await Promise.all(
    CONTENT_MANIFEST.map(async (item) => ({
      ...item,
      contentHtml: await getMarkdownContent(item.file),
    }))
  );

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen scroll-smooth">
      <MermaidInit />
      {/* Hero Section */}
      <section id="hero" className="w-full relative overflow-hidden px-6 py-24 md:py-32 lg:py-40 flex flex-col items-center text-center">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full -z-10 bg-gradient-to-b from-primary/10 via-transparent to-transparent opacity-50 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000 pointer-events-none" />

        <div className="max-w-4xl mx-auto flex flex-col items-center animate-slide-up">
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 animate-fade-in backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Comprehensive 12-Week MERN Course is Ready
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in [animation-delay:200ms] text-balance">
            Master the MERN Stack. <br className="hidden md:block" />
            <span className="text-gradient">Build Your Real Future.</span>
          </h1>

          <p className="mt-4 max-w-2xl text-lg md:text-xl text-foreground/70 mb-10 animate-fade-in [animation-delay:400ms] leading-relaxed text-balance">
            A purely hands-on, 12-week comprehensive program featuring an integrated Daily Internship Diary. From zero to capstone deployments with expert portfolio building.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in [animation-delay:600ms] w-full justify-center">
            <Link
              href="#capstone-projects"
              className="flex h-12 md:h-14 items-center justify-center rounded-full bg-primary px-8 text-base font-semibold text-white transition-all hover:bg-primary-hover shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] hover:-translate-y-1"
            >
              Start Course Now
            </Link>

            <Link
              href="#master-outline"
              className="flex h-12 md:h-14 items-center justify-center rounded-full border border-foreground/20 bg-background/50 backdrop-blur-sm px-8 text-base font-semibold transition-all hover:bg-foreground/5 hover:border-foreground/30"
            >
              View Full Syllabus
            </Link>
          </div>
        </div>
      </section>

      {/* Features highlight */}
      <section className="w-full py-20 px-6 border-t border-foreground/5 bg-foreground/[0.02]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "No AI Foundation", desc: "Build pure HTML/CSS without AI crutches before touching advanced toolchains." },
            { title: "Daily Internship Diary", desc: "Prove your work. Generate daily tracking logs that serve as concrete portfolio evidence." },
            { title: "Production Capstones", desc: "Build end-to-end applications mimicking real-world startup technical requirements." }
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-background border border-foreground/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-foreground/70 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Markdown Content Sections */}
      <div className="w-full max-w-4xl mx-auto pb-24">
        {sectionsContent.map((section) => (
          <section
            key={section.slug}
            id={section.slug}
            className="w-full px-6 py-16 md:py-24 border-t border-foreground/10 first-of-type:border-t-0 scroll-mt-16"
          >
            <div className="mb-12">
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">{section.category}</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">{section.title}</h2>
              <p className="text-foreground/60 text-lg mt-4">{section.description}</p>
            </div>

            <div
              className="prose prose-lg dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-a:text-primary hover:prose-a:text-primary-hover prose-img:rounded-xl prose-img:border prose-img:border-foreground/10"
              dangerouslySetInnerHTML={{ __html: section.contentHtml }}
            />
          </section>
        ))}
      </div>

      {/* Simple Footer inside main layout */}
      <footer className="w-full border-t border-foreground/10 bg-background py-10 text-center">
        <p className="text-foreground/60 text-sm">
          &copy; {new Date().getFullYear()} InternAge. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
