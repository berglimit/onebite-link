"use client";

import LinkCard from "@/components/LinkCard";
import { useLinks } from "@/components/LinkProvider";

type LinkGridProps = {
  folderId?: number;
};

export default function LinkGrid({ folderId }: LinkGridProps) {
  const { links } = useLinks();
  const visible =
    folderId === undefined
      ? links
      : links.filter((link) => link.folderId === folderId);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {visible.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </div>
  );
}
