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
            className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-black/5 dark:hover:bg-white/10"
          >
            {folder.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
