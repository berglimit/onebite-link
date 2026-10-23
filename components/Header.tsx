import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between bg-[var(--surface)] px-5 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
      <Link href="/" className="text-xl font-bold text-[var(--text)]">
        한입 링크
      </Link>
      <Link
        href="/new"
        className="btn-primary rounded-xl px-4 py-2 text-[15px] font-bold text-white"
      >
        + 새 링크
      </Link>
    </header>
  );
}
