import Link from "next/link";
import type { Folder } from "@/lib/mock-data";

type FolderListProps = {
  folders: Folder[];
};

export default function FolderList({ folders }: FolderListProps) {
  return (
    <ul className="flex flex-col gap-1">
      {folders.map((folder) => (
        <li key={folder.id}>
          <Link
            href={`/folder/${folder.id}`}
            className="nav-item block w-full rounded-xl px-3 py-2.5 text-left text-[16px] text-[var(--text)]"
          >
            {folder.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
