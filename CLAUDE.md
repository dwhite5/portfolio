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

Markdown files in `content/case-studies/`, `content/projects/`, and `content/about.md` are the source of truth for all content. Slug-routed pages derive the slug from the filename; `about.md` is a one-off with no slug routing. Pages read files at request time using `fs` directly (no CMS, no database).

Required frontmatter fields: `title`, `summary`. Case study pages also expect `date`, `topic`, `concepts` (array), and optionally `githubUrl`.

Markdown is rendered via `remark` → `remark-gfm` → `remark-html` with `sanitize: false`. The resulting HTML is injected into `ArticleLightbox` via `dangerouslySetInnerHTML`.

Since `sanitize: false`, raw HTML in markdown is passed through. This is intentional — authors use inline `<img>` tags with explicit `width` and `style` attributes to control image sizing (e.g. `<img src="..." width="300" style="width: 300px;" />`). The CSS rule `.article-prose img:not([width])` applies `width: 100%` only to images without a `width` attribute, so the inline value is respected.

### Image galleries and lightbox

`ArticleLightbox` (`app/components/ArticleLightbox.tsx`) is a client component that wraps rendered article HTML. It post-processes the HTML string to detect groups of images (either multiple `<img>` tags in one `<p>`, or consecutive `<p><img></p>` siblings) and wraps them in `.article-gallery.cols-2` or `.article-gallery.cols-3` grid divs. Clicking any image opens a fullscreen lightbox with keyboard navigation (arrow keys + Escape).

Images for case studies and projects live under `public/images/case-studies/` and `public/images/projects/`. The profile photo is at `public/images/profile.jpg` and is referenced directly from `content/about.md` via a raw `<img>` tag.

Galleries have a `zinc-200` background in light mode and `zinc-700` in dark mode (defined in `.article-prose .article-gallery` and `.dark .article-prose .article-gallery` in `globals.css`) to visually contain the image grid against the page background.

### Styling

Tailwind CSS v4 with the PostCSS plugin. Dark mode is class-based (`dark` on `<html>`), toggled by `ThemeToggle` which persists preference to `localStorage`. The `.dark` variant is declared as `@variant dark (&:where(.dark, .dark *))` in `globals.css`.

Article body prose is styled via hand-written `.article-prose` CSS classes in `globals.css` (not `@tailwindcss/typography`) — keep article styles there rather than adding Tailwind utilities to the rendered HTML.

### Animated gradient banner

`AnimatedGradient` (`app/components/AnimatedGradient.tsx`) is a client component rendering CSS-animated blobs. Each page section has its own exported blob color set (`caseStudyBlobs`, `projectBlobs`). The `blob-drift-0` through `blob-drift-4` keyframe animations are defined in `globals.css` and must stay in sync with blob array indices.

### Route structure

- `/` — home, lists both projects and case studies
- `/projects` — index, `/projects/[slug]` — detail
- `/case-studies` — index, `/case-studies/[slug]` — detail (with sidebar showing date/concepts)
- `/about` — reads from `content/about.md`, same remark pipeline as other pages but no slug routing

Detail pages use `generateStaticParams` to enumerate slugs at build time.
