"use client";

import { useEffect, useRef, useState } from "react";

type LightboxState = { src: string; alt: string } | null;

export default function ArticleLightbox({ html }: { html: string }) {
  const articleRef = useRef<HTMLElement>(null);
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;

    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG") {
        const img = target as HTMLImageElement;
        setLightbox({ src: img.src, alt: img.alt });
      }
    };

    article.addEventListener("click", handler);
    return () => article.removeEventListener("click", handler);
  }, [html]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <>
      <article
        ref={articleRef}
        className="article-prose max-w-[65ch] flex-1 [&_img]:cursor-zoom-in"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute right-4 top-4 text-white/70 hover:text-white"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
