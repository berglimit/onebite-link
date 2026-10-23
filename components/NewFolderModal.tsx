"use client";

import { useEffect, useState } from "react";
import { useFolders } from "@/components/FolderProvider";

type NewFolderModalProps = {
  onClose: () => void;
};

export default function NewFolderModal({ onClose }: NewFolderModalProps) {
  const { addFolder } = useFolders();
  const [name, setName] = useState("");
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
    addFolder(trimmed);
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
        aria-label="새 폴더 만들기"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-5 rounded-2xl bg-[var(--surface)] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
      >
        <h2 className="text-xl font-bold leading-snug text-[var(--text)]">
          새 폴더 만들기
        </h2>
        <label className="flex flex-col gap-2 text-[15px] font-bold text-[var(--text)]">
          폴더 이름
          <input
            autoFocus
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
            disabled={!trimmed}
            className="btn-primary flex-1 rounded-xl px-5 py-3.5 text-[17px] font-bold text-white"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
}
