import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import Link from "next/link";
import matter from "gray-matter";
import Breadcrumb from "../components/Breadcrumb";

export default function ProjectsIndex() {
  const dir = join(process.cwd(), "content/projects");
  const items = readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { data } = matter(readFileSync(join(dir, f), "utf-8"));
      return {
        slug: f.replace(/\.md$/, ""),
        title: data.title as string,
        summary: data.summary as string,
      };
    });

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <main className="mx-auto max-w-4xl px-6 py-16">
        <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]} />
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mb-10">
          Projects
        </h1>
        <div className="space-y-4">
          {items.map((item) => (
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
      </main>
    </div>
  );
}
