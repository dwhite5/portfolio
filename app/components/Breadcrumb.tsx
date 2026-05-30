import Link from "next/link";

type Crumb = { label: string; href?: string };

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="mb-8 flex items-center gap-1.5 text-sm text-zinc-400 dark:text-zinc-500">
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span>/</span>}
            {isLast || !crumb.href ? (
              <span className={isLast ? "text-zinc-600 dark:text-zinc-400" : ""}>
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="hover:text-zinc-600 dark:hover:text-zinc-300"
              >
                {crumb.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
