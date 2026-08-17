"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { createClient } from "@/utils/supabase/client";
import type { Folder } from "@/lib/types";

type FolderContextValue = {
  folders: Folder[];
  isAddingFolder: boolean;
  addFolder: (name: string) => Promise<void>;
  renameFolder: (id: number, name: string) => Promise<void>;
  deleteFolder: (id: number) => void;
};

const FolderContext = createContext<FolderContextValue | null>(null);

export function FolderProvider({
  children,
  initialFolders,
}: {
  children: ReactNode;
  initialFolders: Folder[];
}) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [isAddingFolder, setIsAddingFolder] = useState(false);

  async function addFolder(name: string) {
    const trimmed = name.trim();
    if (!trimmed || isAddingFolder) return;

    setIsAddingFolder(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("folders")
        .insert({ name: trimmed })
        .select()
        .single();

      if (error) throw error;

      setFolders((prev) => [...prev, data as Folder]);
    } finally {
      setIsAddingFolder(false);
    }
  }

  async function renameFolder(id: number, name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;

    const supabase = createClient();
    const { error } = await supabase
      .from("folders")
      .update({ name: trimmed })
      .eq("id", id);

    if (error) throw error;

    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === id ? { ...folder, name: trimmed } : folder,
      ),
    );
  }

  function deleteFolder(id: number) {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  }

  return (
    <FolderContext.Provider
      value={{ folders, isAddingFolder, addFolder, renameFolder, deleteFolder }}
    >
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
