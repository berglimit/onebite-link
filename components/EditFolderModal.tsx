"use client";

import { useEffect, useState } from "react";
import { useFolders } from "@/components/FolderProvider";
import type { Folder } from "@/lib/mock-data";

type EditFolderModalProps = {
  folder: Folder;
  onClose: () => void;
};

export default function EditFolderModal({
  folder,
  onClose,
}: EditFolderModalProps) {
  const { renameFolder } = useFolders();
  const [name, setName] = useState(folder.name);
  const trimmed = name.trim();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trimmed) return;
    renameFolder(folder.id, trimmed);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 px-5"
      onClick={onClose}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-label="폴더 이름 수정"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-5 rounded-2xl bg-[var(--surface)] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
      >
        <h2 className="text-xl font-bold leading-snug text-[var(--text)]">
          폴더 이름 수정
        </h2>
        <label className="flex flex-col gap-2 text-[15px] font-bold text-[var(--text)]">
          폴더 이름
          <input
            autoFocus
            onFocus={(e) => e.currentTarget.select()}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="폴더 이름을 입력하세요"
            className="field rounded-xl px-4 py-3.5 text-[17px] font-normal text-[var(--text)]"
          />
        </label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary flex-1 rounded-xl px-5 py-3.5 text-[17px] font-bold text-[var(--accent)]"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={!trimmed || trimmed === folder.name}
            className="btn-primary flex-1 rounded-xl px-5 py-3.5 text-[17px] font-bold text-white"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
}
