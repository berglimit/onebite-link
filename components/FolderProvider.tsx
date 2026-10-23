"use client";

import { createContext, useContext, useState } from "react";
import type { Folder } from "@/lib/mock-data";

type FolderContextValue = {
  folders: Folder[];
  addFolder: (name: string) => void;
  removeFolder: (id: number) => void;
};

const FolderContext = createContext<FolderContextValue | null>(null);

export function useFolders() {
  const ctx = useContext(FolderContext);
  if (!ctx) throw new Error("useFolders must be used within FolderProvider");
  return ctx;
}

export default function FolderProvider({
  initialFolders,
  children,
}: {
  initialFolders: Folder[];
  children: React.ReactNode;
}) {
  const [folders, setFolders] = useState(initialFolders);

  const addFolder = (name: string) => {
    setFolders((prev) => [
      ...prev,
      { id: Math.max(0, ...prev.map((f) => f.id)) + 1, name },
    ]);
  };

  const removeFolder = (id: number) => {
    setFolders((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <FolderContext value={{ folders, addFolder, removeFolder }}>{children}</FolderContext>
  );
}
