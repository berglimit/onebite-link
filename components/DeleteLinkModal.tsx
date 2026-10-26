"use client";

import { useEffect } from "react";
import type { LinkItem } from "@/lib/mock-data";

type DeleteLinkModalProps = {
  link: LinkItem;
  onConfirm: () => void;
  onClose: () => void;
};

export default function DeleteLinkModal({
  link,
  onConfirm,
  onClose,
}: DeleteLinkModalProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 px-5"
      onClick={onClose}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-label="링크 삭제 확인"
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-sm flex-col gap-5 rounded-2xl bg-[var(--surface)] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold leading-snug text-[var(--text)]">
            링크를 삭제할까요?
          </h2>
          <p className="text-[15px] leading-relaxed text-[var(--text-sub)]">
            &lsquo;{link.title}&rsquo; 링크가 삭제됩니다. 이 작업은 되돌릴 수
            없어요.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary flex-1 rounded-xl px-5 py-3.5 text-[17px] font-bold text-[var(--accent)]"
          >
            취소
          </button>
          <button
            type="button"
            autoFocus
            onClick={onConfirm}
            className="btn-danger flex-1 rounded-xl px-5 py-3.5 text-[17px] font-bold text-white"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
