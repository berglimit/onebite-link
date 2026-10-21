import type { Folder } from "@/lib/mock-data";

type NewLinkFormProps = {
  folders: Folder[];
};

const fieldClass =
  "rounded border border-black/20 bg-transparent px-3 py-2 dark:border-white/30";

export default function NewLinkForm({ folders }: NewLinkFormProps) {
  return (
    <form className="flex w-full max-w-lg flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm font-medium">
        링크
        <input
          type="url"
          name="url"
          placeholder="https://example.com"
          className={fieldClass}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium">
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
        className="self-end rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-opacity hover:opacity-80"
      >
        저장
      </button>
    </form>
  );
}
