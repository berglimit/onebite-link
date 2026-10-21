import type { LinkItem } from "@/lib/mock-data";

type LinkCardProps = {
  link: LinkItem;
};

export default function LinkCard({ link }: LinkCardProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-2 rounded-lg border border-black/10 p-4 transition-shadow hover:shadow-md dark:border-white/15"
    >
      <h3 className="font-semibold">{link.title}</h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {link.description}
      </p>
      <span className="truncate text-xs text-zinc-500">{link.url}</span>
    </a>
  );
}
