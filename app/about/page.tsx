import Breadcrumb from "../components/Breadcrumb";

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <main className="mx-auto max-w-4xl px-6 py-16">
        {/* Header */}
        <div className="mb-10 max-w-[65ch]">
          <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "About" }]} />
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            About
          </h1>
        </div>

        {/* Body + Sidebar */}
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Main content */}
          <div className="max-w-[65ch] flex-1 space-y-6">
            {/* Profile photo */}
            <div className="h-24 w-24 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              {/* Drop a photo at public/images/profile.jpg and replace the div above with:
              <Image src="/images/profile.jpg" alt="Dylan White" width={96} height={96} className="object-cover" /> */}
            </div>

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

          {/* Sidebar */}
          <aside className="shrink-0 space-y-6 lg:w-48">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                Links
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <a
                    href="https://github.com/dwhite5/portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
                  >
                    <svg className="h-4 w-4 shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/mrdylanwhite"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
                  >
                    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
