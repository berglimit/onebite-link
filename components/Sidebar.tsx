import Link from "next/link";
import FolderList from "@/components/FolderList";
import type { Folder } from "@/lib/mock-data";

type SidebarProps = {
  folders: Folder[];
};

export default function Sidebar({ folders }: SidebarProps) {
  return (
    <aside className="flex w-56 shrink-0 flex-col gap-4 border-r border-black/10 p-4 dark:border-white/15">
      <Link
        href="/"
        className="rounded bg-black/10 px-3 py-2 text-left text-sm font-semibold dark:bg-white/15"
      >
        ALL
      </Link>
      <FolderList folders={folders} />
    </aside>
  );
}
