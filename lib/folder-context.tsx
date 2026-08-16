"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { folders as initialFolders } from "@/lib/mock-data";
import type { Folder } from "@/lib/types";

type FolderContextValue = {
  folders: Folder[];
  addFolder: (name: string) => void;
  deleteFolder: (id: string) => void;
};

const FolderContext = createContext<FolderContextValue | null>(null);

export function FolderProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);

  function addFolder(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;
    const id = `folder-${Date.now()}`;
    setFolders((prev) => [...prev, { id, name: trimmed }]);
  }

  function deleteFolder(id: string) {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  }

  return (
    <FolderContext.Provider value={{ folders, addFolder, deleteFolder }}>
      {children}
    </FolderContext.Provider>
  );
}

export function useFolders() {
  const context = useContext(FolderContext);
  if (!context) {
    throw new Error("useFolders must be used within a FolderProvider");
  }
  return context;
}
