# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server
npm run build    # production build
npm run lint     # eslint
```

There are no tests. No test runner is configured.

## Architecture

This is a **Next.js 16 / React 19** portfolio site with file-system-based content. All pages are Server Components by default; components that need browser APIs are marked `"use client"`.

### Content system

Markdown files in `content/case-studies/` and `content/projects/` are the source of truth for all content. Each file has gray-matter frontmatter; the slug is derived from the filename. Pages read these files at request time using `fs` directly (no CMS, no database).

Required frontmatter fields: `title`, `summary`. Case study pages also expect `date`, `topic`, `concepts` (array), and optionally `githubUrl`.

Markdown is rendered via `remark` → `remark-gfm` → `remark-html` with `sanitize: false`. The resulting HTML is injected into `ArticleLightbox` via `dangerouslySetInnerHTML`.

### Image galleries and lightbox

`ArticleLightbox` (`app/components/ArticleLightbox.tsx`) is a client component that wraps rendered article HTML. It post-processes the HTML string to detect groups of images (either multiple `<img>` tags in one `<p>`, or consecutive `<p><img></p>` siblings) and wraps them in `.article-gallery.cols-2` or `.article-gallery.cols-3` grid divs. Clicking any image opens a fullscreen lightbox with keyboard navigation (arrow keys + Escape). Images for articles live under `public/images/case-studies/` and `public/images/projects/`.

### Styling

Tailwind CSS v4 with the PostCSS plugin. Dark mode is class-based (`dark` on `<html>`), toggled by `ThemeToggle` which persists preference to `localStorage`. The `.dark` variant is declared as `@variant dark (&:where(.dark, .dark *))` in `globals.css`.

Article body prose is styled via hand-written `.article-prose` CSS classes in `globals.css` (not `@tailwindcss/typography`) — keep article styles there rather than adding Tailwind utilities to the rendered HTML.

### Animated gradient banner

`AnimatedGradient` (`app/components/AnimatedGradient.tsx`) is a client component rendering CSS-animated blobs. Each page section has its own exported blob color set (`caseStudyBlobs`, `projectBlobs`). The `blob-drift-0` through `blob-drift-4` keyframe animations are defined in `globals.css` and must stay in sync with blob array indices.

### Route structure

- `/` — home, lists both projects and case studies
- `/projects` — index, `/projects/[slug]` — detail
- `/case-studies` — index, `/case-studies/[slug]` — detail (with sidebar showing date/concepts)
- `/about` — static page

Detail pages use `generateStaticParams` to enumerate slugs at build time.
