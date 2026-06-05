import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import Link from "next/link";
import matter from "gray-matter";
import AnimatedGradient from "@/app/components/AnimatedGradient";

type CardItem = {
  slug: string;
  title: string;
  summary: string;
};

function loadItems(contentType: "projects" | "case-studies"): CardItem[] {
  const dir = join(process.cwd(), "content", contentType);
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = readFileSync(join(dir, f), "utf-8");
      const { data } = matter(raw);
      return {
        slug: f.replace(/\.md$/, ""),
        title: data.title as string,
        summary: data.summary as string,
      };
    });
}

export default function Home() {
  const projects = loadItems("projects");
  const caseStudies = loadItems("case-studies");

  return (
    <div className="bg-white dark:bg-zinc-950 font-sans">
      <main className="mx-auto max-w-4xl px-6 py-8 sm:py-16">
        {/* Banner */}
        <AnimatedGradient className="mb-8 sm:mb-16 h-36 sm:h-48 w-full" />

        {/* Hero */}
        <section className="mb-12 sm:mb-24">
          <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
            Dylan White
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400">
            Your tagline goes here.
          </p>
        </section>

        {/* Projects */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-6">
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((item) => (
              <Link
                key={item.slug}
                href={`/projects/${item.slug}`}
                className="block rounded-lg border border-zinc-200 p-5 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
              >
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  {item.summary}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Case Studies */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-6">
            Case Studies
          </h2>
          <div className="space-y-4">
            {caseStudies.map((item) => (
              <Link
                key={item.slug}
                href={`/case-studies/${item.slug}`}
                className="block rounded-lg border border-zinc-200 p-5 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
              >
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  {item.summary}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
