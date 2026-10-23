"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import DeleteFolderModal from "@/components/DeleteFolderModal";
import EditFolderModal from "@/components/EditFolderModal";
import { useFolders } from "@/components/FolderProvider";
import type { Folder } from "@/lib/mock-data";

type FolderListProps = {
  folders: Folder[];
};

export default function FolderList({ folders }: FolderListProps) {
  const { removeFolder } = useFolders();
  const pathname = usePathname();
  const router = useRouter();
  const [targetFolder, setTargetFolder] = useState<Folder | null>(null);
  const [editTarget, setEditTarget] = useState<Folder | null>(null);

  const handleConfirm = () => {
    if (!targetFolder) return;
    removeFolder(targetFolder.id);
    if (pathname === `/folder/${targetFolder.id}`) router.push("/");
    setTargetFolder(null);
  };

  return (
    <>
      <ul className="flex flex-col gap-1">
        {folders.map((folder) => (
          <li
            key={folder.id}
            className="folder-row nav-item flex items-center rounded-xl"
          >
            <Link
              href={`/folder/${folder.id}`}
              className="min-w-0 flex-1 truncate px-3 py-2.5 text-left text-[16px]"
            >
              {folder.name}
            </Link>
            <button
              type="button"
              aria-label={`${folder.name} 폴더 이름 수정`}
              onClick={() => setEditTarget(folder)}
              className="folder-action shrink-0 rounded-lg p-1.5 text-[var(--text-sub)]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
            </button>
            <button
              type="button"
              aria-label={`${folder.name} 폴더 삭제`}
              onClick={() => setTargetFolder(folder)}
              className="folder-action folder-delete mr-1.5 shrink-0 rounded-lg p-1.5 text-[var(--text-sub)]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 6h18" />
                <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
      {editTarget && (
        <EditFolderModal
          folder={editTarget}
          onClose={() => setEditTarget(null)}
        />
      )}
      {targetFolder && (
        <DeleteFolderModal
          folder={targetFolder}
          onConfirm={handleConfirm}
          onClose={() => setTargetFolder(null)}
        />
      )}
    </>
  );
}
