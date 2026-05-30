export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans">
      <main className="mx-auto max-w-3xl px-6 py-24">
        {/* Hero */}
        <section className="mb-24">
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
            Dylan White
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400">
            Your tagline goes here.
          </p>
        </section>

        {/* Projects */}
        <section className="mb-20">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-6">
            Projects
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-5"
              >
                <div className="h-4 w-1/3 rounded bg-zinc-100 dark:bg-zinc-800 mb-2" />
                <div className="h-3 w-2/3 rounded bg-zinc-100 dark:bg-zinc-800" />
              </div>
            ))}
          </div>
        </section>

        {/* Case Studies */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-6">
            Case Studies
          </h2>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-5"
              >
                <div className="h-4 w-1/3 rounded bg-zinc-100 dark:bg-zinc-800 mb-2" />
                <div className="h-3 w-2/3 rounded bg-zinc-100 dark:bg-zinc-800" />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
