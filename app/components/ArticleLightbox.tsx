"use client";

import { useEffect, useRef, useState } from "react";

type LightboxState = {
  src: string;
  alt: string;
  set: { src: string; alt: string }[];
  index: number;
} | null;

// Transform the HTML string to wrap consecutive image-only <p> blocks into gallery divs.
// remark-html produces <p><img><img></p> for images on adjacent lines (no blank line),
// or separate <p><img></p> blocks when separated by blank lines.
// We handle both cases here so galleries survive React re-renders.
function applyGalleries(html: string): string {
  // Case (a): <p> containing only 2+ imgs — replace with gallery div
  html = html.replace(
    /<p>((?:\s*<img[^>]*>\s*){2,})<\/p>/g,
    (_, imgs) => {
      const count = (imgs.match(/<img/g) ?? []).length;
      const cols = count === 2 ? "cols-2" : "cols-3";
      return `<div class="article-gallery ${cols}">${imgs}</div>`;
    }
  );

  // Case (b): consecutive <p><img/></p> siblings — group runs of 2+ into gallery divs
  html = html.replace(
    /((?:<p>\s*<img[^>]*>\s*<\/p>\s*){2,})/g,
    (run) => {
      const imgs = run.match(/<img[^>]*>/g) ?? [];
      const cols = imgs.length === 2 ? "cols-2" : "cols-3";
      return `<div class="article-gallery ${cols}">${imgs.join("")}</div>`;
    }
  );

  return html;
}

export default function ArticleLightbox({ html }: { html: string }) {
  const articleRef = useRef<HTMLElement>(null);
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const processedHtml = applyGalleries(html);

  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;

    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName !== "IMG") return;
      const img = target as HTMLImageElement;
      const parent = img.parentElement;

      // If inside a gallery, build the full set from siblings
      if (parent?.classList.contains("article-gallery")) {
        const siblings = Array.from(parent.querySelectorAll("img")) as HTMLImageElement[];
        const set = siblings.map((s) => ({ src: s.src, alt: s.alt }));
        const index = siblings.indexOf(img);
        setLightbox({ src: img.src, alt: img.alt, set, index });
      } else {
        setLightbox({ src: img.src, alt: img.alt, set: [{ src: img.src, alt: img.alt }], index: 0 });
      }
    };

    article.addEventListener("click", handler);
    return () => article.removeEventListener("click", handler);
  }, [processedHtml]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightbox(null);
      } else if (e.key === "ArrowRight") {
        setLightbox((prev) => {
          if (!prev || prev.index >= prev.set.length - 1) return prev;
          const next = prev.index + 1;
          return { ...prev, ...prev.set[next], index: next };
        });
      } else if (e.key === "ArrowLeft") {
        setLightbox((prev) => {
          if (!prev || prev.index <= 0) return prev;
          const next = prev.index - 1;
          return { ...prev, ...prev.set[next], index: next };
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const canPrev = lightbox && lightbox.index > 0;
  const canNext = lightbox && lightbox.index < lightbox.set.length - 1;

  return (
    <>
      <article
        ref={articleRef}
        className="article-prose max-w-[65ch] flex-1 [&_img]:cursor-zoom-in"
        dangerouslySetInnerHTML={{ __html: processedHtml }}
      />

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            className="absolute right-4 top-4 text-white/70 hover:text-white"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          {canPrev && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((prev) => {
                  if (!prev) return prev;
                  const next = prev.index - 1;
                  return { ...prev, ...prev.set[next], index: next };
                });
              }}
              aria-label="Previous image"
            >
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Next */}
          {canNext && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((prev) => {
                  if (!prev) return prev;
                  const next = prev.index + 1;
                  return { ...prev, ...prev.set[next], index: next };
                });
              }}
              aria-label="Next image"
            >
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Position indicator — only shown for galleries with multiple images */}
          {lightbox.set.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {lightbox.set.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    i === lightbox.index ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
