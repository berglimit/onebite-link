"use client";

import { useFolders } from "@/components/FolderProvider";

const fieldClass =
  "field rounded-xl px-4 py-3.5 text-[17px] font-normal text-[var(--text)]";

export default function NewLinkForm() {
  const { folders } = useFolders();

  return (
    <form className="flex w-full max-w-lg flex-col gap-5 self-start rounded-2xl bg-[var(--surface)] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      <h2 className="text-xl font-bold leading-snug">새 링크 저장</h2>
      <label className="flex flex-col gap-2 text-[15px] font-bold text-[var(--text)]">
        링크
        <input
          type="url"
          name="url"
          placeholder="https://example.com"
          className={fieldClass}
        />
      </label>
      <label className="flex flex-col gap-2 text-[15px] font-bold text-[var(--text)]">
        폴더
        <select name="folderId" defaultValue="" className={fieldClass}>
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
      <button
        type="submit"
        className="btn-primary rounded-xl px-5 py-3.5 text-[17px] font-bold text-white"
      >
        저장
      </button>
    </form>
  );
}
