import { notFound } from "next/navigation";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import matter from "gray-matter";
import Breadcrumb from "@/app/components/Breadcrumb";
import ArticleLightbox from "@/app/components/ArticleLightbox";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

type CaseStudyMetadata = {
  title: string;
  summary: string;
  date: string;
  topic: string;
  concepts: string[];
  githubUrl?: string;
};

const contentDir = join(process.cwd(), "content/case-studies");

async function loadCaseStudy(slug: string) {
  const filePath = join(contentDir, `${slug}.md`);
  let raw: string;
  try {
    raw = readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }

  const { data, content } = matter(raw);
  const html = (
    await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(content)
  ).toString();

  return { metadata: data as CaseStudyMetadata, html };
}

export async function generateStaticParams() {
  return readdirSync(contentDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({ slug: f.replace(/\.md$/, "") }));
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/case-studies/[slug]">) {
  const { slug } = await params;
  const study = await loadCaseStudy(slug);
  if (!study) notFound();

  const { metadata, html } = study!;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <main className="mx-auto max-w-4xl px-6 py-16">
        {/* Header */}
        <div className="mb-10 max-w-[65ch]">
          <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Case Studies", href: "/case-studies" }, { label: metadata.title }]} />
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {metadata.title}
          </h1>
          <p className="mt-2 text-base text-zinc-500 dark:text-zinc-400">
            {metadata.summary}
          </p>

          {metadata.githubUrl && (
            <a
              href={metadata.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-zinc-200 px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-200"
            >
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              View on GitHub
            </a>
          )}
        </div>

        {/* Body + Sidebar */}
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Article */}
          <ArticleLightbox html={html} />

          {/* Sidebar */}
          <aside className="shrink-0 space-y-6 lg:w-48">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                Date
              </p>
              <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                {metadata.date}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                Concepts
              </p>
              <ul className="mt-1 space-y-1">
                {metadata.concepts.map((concept) => (
                  <li key={concept} className="text-sm text-zinc-700 dark:text-zinc-300">
                    {concept}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
