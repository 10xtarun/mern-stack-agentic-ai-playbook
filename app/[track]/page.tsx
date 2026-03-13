import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { CONTENT_MANIFEST, getSectionByTrack } from "@/lib/content";

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
      const manifestItem = CONTENT_MANIFEST.find(item => 
        item.file === filename || item.file.endsWith('/' + filename)
      );
      if (manifestItem) {
        return `href="${hash ? hash : '#' + manifestItem.slug}"`;
      }
    }
    return match;
  });

  // 1. Process Citations (References)
  contentHtml = contentHtml.replace(/\[\^(\d+)\](?!\:)/g, '<a href="#cite-$1" class="text-primary font-bold hover:underline" title="Go to citation $1"><sup>[$1]</sup></a>');

  // 2. Process Citations (Definitions)
  contentHtml = contentHtml.replace(/<p>\s*(\[\^\d+\]:[\s\S]*?)\s*<\/p>/g, '$1');
  contentHtml = contentHtml.replace(/\[\^(\d+)\]:\s*([\s\S]*?)(?=\[\^\d+\]:|$|<h|<p>|<ul|<ol|<div)/gi, (match, id, text) => {
    let rawText = text.replace(/<br\s*\/?>/gi, '').trim();
    let linkifiedText = rawText;
    if (!rawText.includes('<a ')) {
      linkifiedText = rawText.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" class="text-primary hover:text-primary-hover hover:underline transition-colors break-all" rel="noopener noreferrer">$1</a>');
    }
    return `<div id="cite-${id}" class="citation mt-4 p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col sm:flex-row gap-3 break-words transition-all hover:bg-white/10 hover:border-white/20">
          <span class="font-bold text-primary bg-primary/10 rounded-full h-8 w-8 flex items-center justify-center shrink-0">[${id}]</span>
          <div class="flex-1 text-sm"><span class="font-medium opacity-90 block mb-1">${linkifiedText}</span></div>
      </div>`;
  });

  // 3. Process Images
  contentHtml = contentHtml.replace(/(?:<p>\s*(?:<img[^>]+>\s*(?:<br\s*\/?>)?\s*)+\s*<\/p>\s*)+/g, (match) => {
    const imgTags = match.match(/<img[^>]+>/g);
    if (!imgTags) return match;
    if (imgTags.length === 1) {
      return imgTags[0].replace('<img', '<img class="w-full max-w-4xl mx-auto rounded-xl shadow-lg border border-white/10 my-10 object-cover transition-all hover:shadow-2xl hover:scale-[1.01] duration-300"');
    }
    let gridClass = "grid grid-cols-1 md:grid-cols-2 gap-6 my-10 w-full";
    const styledImgs = imgTags.map(img => img.replace('<img', '<img class="w-full h-full min-h-[250px] max-h-[350px] object-cover rounded-xl shadow-md border border-white/10 transition-transform hover:scale-[1.02] duration-300 hover:shadow-xl"')).join('');
    return `<div class="${gridClass}">${styledImgs}</div>`;
  });

  // Mermaid
  contentHtml = contentHtml.replace(/<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g, (match, code) => {
    const unescaped = code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    return `<div class="mermaid flex justify-center my-8 bg-white/5 p-8 rounded-xl overflow-x-auto w-full">${unescaped}</div>`;
  });

  // 4. Process Simple Tables (Fallback since no remark-gfm is available)
  // remark-html sometimes concatenates table rows into a single <p> tag line if they are tightly packed.
  contentHtml = contentHtml.replace(/<p>(\|[\s\S]*?\|)<\/p>/g, (match, tableContent) => {
    let lines = tableContent.trim().split(/\n|\|\s+(?=\|)/).map((r: string) => r.trim());

    // Ensure all lines start and end with pipes
    lines = lines.map((r: string, idx: number) => {
      let formatted = r;
      if (idx > 0 && !formatted.startsWith('|')) formatted = '| ' + formatted;
      if (idx < lines.length - 1 && !formatted.endsWith('|')) formatted = formatted + ' |';
      return formatted;
    });

    if (lines.length < 2 || !lines[1].includes('-')) return match;

    let html = '<div class="overflow-x-auto my-8"><table class="w-full text-left border-collapse text-sm min-w-max">';
    lines.forEach((row: string, i: number) => {
      if (i === 1) return; // Skip divider row

      row = row.replace(/<br\s*\/?>$/, '').trim();
      const rowContent = row.replace(/^\||\|$/g, '');
      const cells = rowContent.split('|').map((c: string) => c.trim());

      const isHeader = i === 0;
      const tag = isHeader ? 'th' : 'td';

      html += `<tr class="border-b border-white/10 hover:bg-white/5 transition-colors ${isHeader ? 'bg-white/5' : ''}">`;
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

export function generateStaticParams() {
  return [
    { track: 'mern' },
    { track: 'data-science' },
    { track: 'cloud-devops' }
  ];
}

export default async function TrackPage({ params }: { params: Promise<{ track: string }> }) {
  const { track } = await params;
  const section = getSectionByTrack(track);
  
  if (!section) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <h1 className="text-4xl font-bold mb-4">Track Not Found</h1>
        <Link href="/" className="text-primary hover:underline">Return to Home</Link>
      </div>
    );
  }

  const sectionsContent = await Promise.all(
    section.items.map(async (item) => ({
      ...item,
      contentHtml: await getMarkdownContent(item.file),
    }))
  );

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen scroll-smooth">
      <MermaidInit />
      
      {/* ─── Hero Section ─────────────────────────── */}
      <section id="hero" className="w-full relative overflow-hidden px-6 py-24 md:py-32 flex flex-col items-center text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center animate-slide-up">
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 animate-fade-in backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            {section.title} Track
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 animate-fade-in [animation-delay:200ms] text-balance">
            Master the {section.title}. <br className="hidden md:block" />
            <span className="text-gradient">Professional Playbook.</span>
          </h1>

          <p className="max-w-2xl text-lg text-foreground/70 mb-10 animate-fade-in [animation-delay:400ms] leading-relaxed text-balance">
            {section.description} 12 weeks of purely hands-on engineering experience.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mb-12 animate-fade-in [animation-delay:600ms]">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="text-3xl font-bold text-primary">12</div>
              <div className="text-xs text-foreground/50 uppercase tracking-wider font-semibold">Weeks</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="text-3xl font-bold text-primary">3</div>
              <div className="text-xs text-foreground/50 uppercase tracking-wider font-semibold">Capstones</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="text-3xl font-bold text-primary">6+</div>
              <div className="text-xs text-foreground/50 uppercase tracking-wider font-semibold">Mini Projects</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in [animation-delay:800ms] w-full justify-center">
            <Link
              href="#curriculum"
              className="flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-semibold text-white transition-all hover:bg-primary-hover shadow-lg shadow-primary/20 hover:-translate-y-1"
            >
              Explore Curriculum
            </Link>
            <Link
              href="#capstones"
              className="flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-8 text-base font-semibold transition-all hover:bg-white/10"
            >
              Capstone Specs
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Curriculum Grid ──────────────────────── */}
      <section id="curriculum" className="w-full py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <div className="text-primary font-mono text-sm uppercase tracking-widest mb-2">The Roadmap</div>
              <h2 className="text-4xl font-extrabold">12 Weeks of Mastery</h2>
              <p className="text-foreground/60 mt-4">Follow the playbook week by week. Each module includes theory, follow-along practice, and a mini-project.</p>
            </div>
          </div>

          {section.phases.map((phase, pIdx) => (
            <div key={phase.id} className="mb-16 last:mb-0">
              <div className="flex items-center gap-4 mb-8">
                <div className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20 bg-white/5" style={{ color: phase.color }}>
                  {phase.label}
                </div>
                <div className="h-px flex-1 bg-white/10"></div>
                <div className="text-xs font-mono text-foreground/40 font-semibold">Weeks {phase.weeks}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.items.filter(i => i.phase === phase.id).map((item, iIdx) => (
                  <Link
                    key={item.slug}
                    href={`#${item.slug}`}
                    className="group bg-white/5 border border-white/10 p-6 rounded-2xl transition-all hover:bg-white/10 hover:border-white/20 hover:-translate-y-1"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-mono text-foreground/40 font-bold uppercase">Week {item.week?.toString().padStart(2, '0')}</span>
                      {item.miniProject && (
                        <span className="text-[10px] bg-accent-3/10 text-accent-3 px-2 py-0.5 rounded border border-accent-3/20 font-bold uppercase">🛠️ {item.miniProject}</span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-2 mb-2">{item.title}</h3>
                    <p className="text-sm text-foreground/60 line-clamp-3">{item.description}</p>
                    <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-2">
                      {item.tags?.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] text-foreground/40 bg-white/5 px-2 py-0.5 rounded font-mono">#{tag}</span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Capstones ────────────────────────────── */}
      {section.capstones && (
        <section id="capstones" className="w-full py-20 px-6 border-t border-white/5 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="text-primary font-mono text-sm uppercase tracking-widest mb-2">The Culmination</div>
              <h2 className="text-4xl font-extrabold">Capstone Projects</h2>
              <p className="text-foreground/60 mt-4 max-w-2xl mx-auto">Build production-grade applications mimicking real-world requirements. These are the crown jewels of your portfolio.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.capstones.map((project, idx) => (
                <div key={idx} className="bg-bg-card border border-white/10 rounded-3xl p-8 transition-all hover:border-primary/50 group">
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{project.icon}</div>
                  <div className="text-xs font-mono text-primary font-bold uppercase tracking-wider mb-2">{project.subtitle}</div>
                  <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] text-foreground/60 bg-white/5 px-2 py-1 rounded-md border border-white/5">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Main Content Sections ────────────────── */}
      <div className="w-full max-w-4xl mx-auto pb-24 border-t border-white/5">
        {sectionsContent.length > 0 ? (
          <>
            <div className="py-20 text-center">
              <h2 className="text-3xl font-bold mb-4">Detailed Content</h2>
              <p className="text-foreground/50">Full curriculum details, code snippets, and instructions below.</p>
            </div>
            
            {sectionsContent.map((section) => (
              <section
                key={section.slug}
                id={section.slug}
                className="w-full px-6 py-16 md:py-24 border-t border-white/10 first-of-type:border-t-0 scroll-mt-20 animate-fade-in"
              >
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-primary font-mono text-xs font-bold uppercase tracking-widest">{section.category || 'Module'}</span>
                    {section.week && <span className="bg-white/5 px-3 py-1 rounded-full text-xs font-bold text-foreground/40">Week {section.week}</span>}
                  </div>
                  <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-2">{section.title}</h2>
                  <p className="text-foreground/50 text-xl font-medium mt-6 leading-relaxed">{section.description}</p>
                  
                  <div className="mt-8 flex flex-wrap gap-3">
                    {section.tags?.map(tag => (
                      <span key={tag} className="bg-white/5 text-foreground/60 text-xs px-3 py-1 rounded-full border border-white/10">#{tag}</span>
                    ))}
                  </div>
                </div>

                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: section.contentHtml }}
                />
              </section>
            ))}
          </>
        ) : (
          <div className="py-32 text-center">
             <div className="inline-flex items-center rounded-full border border-accent-3/30 bg-accent-3/10 px-4 py-1.5 text-sm font-medium text-accent-3 mb-6 animate-pulse">
              🛠️ Content Under Development
            </div>
            <h2 className="text-4xl font-extrabold mb-4">Coming Soon</h2>
            <p className="text-foreground/50 text-lg max-w-md mx-auto">We are currently curating the professional playbook for this track. Check back soon for the full curriculum!</p>
            <Link href="/" className="mt-10 inline-block text-primary font-bold hover:underline transition-all">
              ← Return to Track Selection
            </Link>
          </div>
        )}
      </div>

    </div>
  );
}
