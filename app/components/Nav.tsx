import Link from "next/link";
import NavMenu from "./NavMenu";

export default function Nav() {
  return (
    <header className="relative border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="text-sm font-semibold text-zinc-900 dark:text-zinc-50"
        >
          Dylan White
        </Link>
        <NavMenu />
      </div>
    </header>
  );
}
