import Breadcrumb from "../components/Breadcrumb";

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <main className="mx-auto max-w-4xl px-6 py-16">
        <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "About" }]} />
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mb-8">
          About
        </h1>
        <div className="space-y-5 max-w-[65ch]">
          <p className="leading-7 text-zinc-600 dark:text-zinc-400">
            Write a short introduction here — who you are, what you do, and what you care about.
          </p>
          <p className="leading-7 text-zinc-600 dark:text-zinc-400">
            Describe your background: where you've worked, what kinds of problems you've focused on, and what draws you to this type of work.
          </p>
          <p className="leading-7 text-zinc-600 dark:text-zinc-400">
            You can reach me at{" "}
            <a
              href="mailto:dylan.white@icloud.com"
              className="text-zinc-900 underline underline-offset-2 dark:text-zinc-50"
            >
              dylan.white@icloud.com
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
