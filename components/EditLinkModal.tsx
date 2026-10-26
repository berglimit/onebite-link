"use client";

import { useEffect, useState } from "react";
import { useFolders } from "@/components/FolderProvider";
import { useLinks } from "@/components/LinkProvider";
import type { LinkItem } from "@/lib/mock-data";

type EditLinkModalProps = {
  link: LinkItem;
  onClose: () => void;
};

const fieldClass =
  "field rounded-xl px-4 py-3.5 text-[17px] font-normal text-[var(--text)]";

export default function EditLinkModal({ link, onClose }: EditLinkModalProps) {
  const { folders } = useFolders();
  const { updateLink } = useLinks();
  const [folderId, setFolderId] = useState(link.folderId);
  const [title, setTitle] = useState(link.title);
  const [description, setDescription] = useState(link.description);
  const trimmedTitle = title.trim();
  const trimmedDescription = description.trim();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const unchanged =
    folderId === link.folderId &&
    trimmedTitle === link.title &&
    trimmedDescription === link.description;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trimmedTitle || unchanged) return;
    updateLink(link.id, {
      folderId,
      title: trimmedTitle,
      description: trimmedDescription,
    });
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
        aria-label="링크 수정"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-5 rounded-2xl bg-[var(--surface)] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
      >
        <h2 className="text-xl font-bold leading-snug text-[var(--text)]">
          링크 수정
        </h2>
        <label className="flex flex-col gap-2 text-[15px] font-bold text-[var(--text)]">
          폴더
          <select
            value={folderId}
            onChange={(e) => setFolderId(Number(e.target.value))}
            className={fieldClass}
          >
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-[15px] font-bold text-[var(--text)]">
          제목
          <input
            autoFocus
            onFocus={(e) => e.currentTarget.select()}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            className={fieldClass}
          />
        </label>
        <label className="flex flex-col gap-2 text-[15px] font-bold text-[var(--text)]">
          설명
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="설명을 입력하세요"
            className={`${fieldClass} resize-none`}
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
            disabled={!trimmedTitle || unchanged}
            className="btn-primary flex-1 rounded-xl px-5 py-3.5 text-[17px] font-bold text-white"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
}
