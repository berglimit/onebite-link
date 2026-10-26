"use client";

import { useState } from "react";
import DeleteLinkModal from "@/components/DeleteLinkModal";
import EditLinkModal from "@/components/EditLinkModal";
import { useLinks } from "@/components/LinkProvider";
import type { LinkItem } from "@/lib/mock-data";

type LinkCardProps = {
  link: LinkItem;
};

export default function LinkCard({ link }: LinkCardProps) {
  const { removeLink } = useLinks();
  const [confirming, setConfirming] = useState(false);
  const [editing, setEditing] = useState(false);

  return (
    <div className="group relative">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card-hover flex h-full flex-col gap-3 rounded-2xl bg-[var(--surface)] p-5"
      >
        {link.thumbnail && (
          // eslint-disable-next-line @next/next/no-img-element -- 외부 도메인이 임의라 next/image 대신 사용
          <img
            src={link.thumbnail}
            alt=""
            loading="lazy"
            referrerPolicy="no-referrer"
            className="aspect-[1.91/1] w-full rounded-xl bg-[var(--accent-soft)] object-cover"
          />
        )}
        <h3 className="text-lg font-bold leading-snug text-[var(--text)]">
          {link.title}
        </h3>
        <p className="text-[15px] leading-relaxed text-[var(--text-sub)]">
          {link.description}
        </p>
        <span className="w-fit max-w-full truncate rounded-lg bg-[var(--accent-soft)] px-2.5 py-1 text-sm text-[var(--accent)]">
          {link.url}
        </span>
      </a>
      <div className="absolute right-3 top-3 flex gap-1.5">
        <button
          type="button"
          aria-label={`${link.title} 링크 수정`}
          onClick={() => setEditing(true)}
          className="rounded-lg bg-[var(--surface)] p-2 text-[var(--text-sub)] opacity-0 shadow-[0_1px_4px_rgba(0,0,0,0.15)] transition-[opacity,color] duration-200 hover:text-[var(--accent)] focus-visible:opacity-100 group-hover:opacity-100"
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
          aria-label={`${link.title} 링크 삭제`}
          onClick={() => setConfirming(true)}
          className="rounded-lg bg-[var(--surface)] p-2 text-[var(--text-sub)] opacity-0 shadow-[0_1px_4px_rgba(0,0,0,0.15)] transition-[opacity,color] duration-200 hover:text-[var(--error)] focus-visible:opacity-100 group-hover:opacity-100"
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
      </div>
      {editing && (
        <EditLinkModal link={link} onClose={() => setEditing(false)} />
      )}
      {confirming && (
        <DeleteLinkModal
          link={link}
          onConfirm={() => removeLink(link.id)}
          onClose={() => setConfirming(false)}
        />
      )}
    </div>
  );
}
