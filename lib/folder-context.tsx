"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { createClient } from "@/utils/supabase/client";
import type { Folder } from "@/lib/types";

type FolderContextValue = {
  folders: Folder[];
  isAddingFolder: boolean;
  addFolder: (name: string) => Promise<void>;
  renameFolder: (id: number, name: string) => Promise<void>;
  deleteFolder: (id: number) => Promise<void>;
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

  useEffect(() => {
    const supabase = createClient();
    let knownUserId: string | null | undefined = undefined;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const nextUserId = session?.user?.id ?? null;

      if (knownUserId === undefined) {
        knownUserId = nextUserId;
        return;
      }

      if (nextUserId === knownUserId) return;
      knownUserId = nextUserId;

      if (!nextUserId) {
        setFolders([]);
        return;
      }

      const { data } = await supabase
        .from("folders")
        .select("id, name, created_at")
        .eq("user_id", nextUserId)
        .order("id", { ascending: true });

      setFolders((data ?? []) as Folder[]);
    });

    return () => subscription.unsubscribe();
  }, []);

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

  async function deleteFolder(id: number) {
    const supabase = createClient();
    const { error } = await supabase.from("folders").delete().eq("id", id);

    if (error) throw error;

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
