import Link from "next/link";
import FolderList from "@/components/FolderList";
import type { Folder } from "@/lib/mock-data";

type SidebarProps = {
  folders: Folder[];
};

export default function Sidebar({ folders }: SidebarProps) {
  return (
    <aside className="m-4 flex h-fit w-56 shrink-0 flex-col gap-3 rounded-2xl bg-[var(--surface)] p-3 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      <Link
        href="/"
        className="nav-item rounded-xl bg-[var(--accent-soft)] px-3 py-2.5 text-left text-[16px] font-bold text-[var(--accent)]"
      >
        ALL
      </Link>
      <FolderList folders={folders} />
    </aside>
  );
}
