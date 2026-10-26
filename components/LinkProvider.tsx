"use client";

import { createContext, useContext, useState } from "react";
import type { LinkItem } from "@/lib/mock-data";

type LinkContextValue = {
  links: LinkItem[];
  addLink: (link: Omit<LinkItem, "id">) => void;
  removeLink: (id: number) => void;
  updateLink: (
    id: number,
    changes: Pick<LinkItem, "folderId" | "title" | "description">,
  ) => void;
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

  const removeLink = (id: number) => {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  };

  const updateLink: LinkContextValue["updateLink"] = (id, changes) => {
    setLinks((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...changes } : l)),
    );
  };

  return (
    <LinkContext value={{ links, addLink, removeLink, updateLink }}>
      {children}
    </LinkContext>
  );
}
