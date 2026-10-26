"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFolders } from "@/components/FolderProvider";
import { useLinks } from "@/components/LinkProvider";

const fieldClass =
  "field rounded-xl px-4 py-3.5 text-[17px] font-normal text-[var(--text)]";

export default function NewLinkForm() {
  const { folders } = useFolders();
  const { addLink } = useLinks();
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const url = String(form.get("url") ?? "").trim();
    const folderId = Number(form.get("folderId"));

    setPending(true);
    setError("");
    try {
      const res = await fetch(`/api/og?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "링크 정보를 가져오지 못했습니다.");
        return;
      }
      addLink({
        title: data.title,
        description: data.description,
        thumbnail: data.thumbnail || undefined,
        url: data.url,
        folderId,
      });
      router.push("/");
    } catch {
      setError("링크 정보를 가져오지 못했습니다.");
    } finally {
      setPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-lg flex-col gap-5 self-start rounded-2xl bg-[var(--surface)] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      <h2 className="text-xl font-bold leading-snug">새 링크 저장</h2>
      <label className="flex flex-col gap-2 text-[15px] font-bold text-[var(--text)]">
        링크
        <input
          type="url"
          name="url"
          required
          placeholder="https://example.com"
          className={fieldClass}
        />
      </label>
      <label className="flex flex-col gap-2 text-[15px] font-bold text-[var(--text)]">
        폴더
        <select name="folderId" defaultValue="" required className={fieldClass}>
          <option value="" disabled>
            폴더를 선택하세요
          </option>
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
      </label>
      {error && (
        <p role="alert" className="text-[15px] text-red-500">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="btn-primary rounded-xl px-5 py-3.5 text-[17px] font-bold text-white disabled:opacity-60"
      >
        {pending ? "저장 중..." : "저장"}
      </button>
    </form>
  );
}
