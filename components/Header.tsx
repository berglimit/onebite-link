import Link from "next/link";

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-black/10 px-6 dark:border-white/15">
      <Link href="/" className="text-xl font-bold">
        한입 링크
      </Link>
      <Link
        href="/new"
        className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-80"
      >
        + 새 링크
      </Link>
    </header>
  );
}
