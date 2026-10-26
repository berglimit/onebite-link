"use client";

import { createContext, useContext, useState } from "react";
import type { LinkItem } from "@/lib/mock-data";

type LinkContextValue = {
  links: LinkItem[];
  addLink: (link: Omit<LinkItem, "id">) => void;
};

const LinkContext = createContext<LinkContextValue | null>(null);

export function useLinks() {
  const ctx = useContext(LinkContext);
  if (!ctx) throw new Error("useLinks must be used within LinkProvider");
  return ctx;
}

export default function LinkProvider({
  initialLinks,
  children,
}: {
  initialLinks: LinkItem[];
  children: React.ReactNode;
}) {
  const [links, setLinks] = useState(initialLinks);

  const addLink = (link: Omit<LinkItem, "id">) => {
    setLinks((prev) => [
      ...prev,
      { ...link, id: Math.max(0, ...prev.map((l) => l.id)) + 1 },
    ]);
  };

  return <LinkContext value={{ links, addLink }}>{children}</LinkContext>;
}
