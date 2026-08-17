"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { createClient } from "@/utils/supabase/client";
import type { LinkItem } from "@/lib/types";

type NewLinkInput = {
  url: string;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
  folder_id: number | null;
};
type LinkEditableFields = Pick<LinkItem, "title" | "description" | "folder_id">;

type LinkContextValue = {
  links: LinkItem[];
  isAddingLink: boolean;
  addLink: (link: NewLinkInput) => Promise<void>;
  updateLink: (id: number, updates: LinkEditableFields) => Promise<void>;
  deleteLink: (id: number) => Promise<void>;
};

const LinkContext = createContext<LinkContextValue | null>(null);

export function LinkProvider({
  children,
  initialLinks,
}: {
  children: ReactNode;
  initialLinks: LinkItem[];
}) {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks);
  const [isAddingLink, setIsAddingLink] = useState(false);

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
        setLinks([]);
        return;
      }

      const { data } = await supabase
        .from("links")
        .select("id, url, title, description, thumbnail_url, folder_id, created_at")
        .eq("user_id", nextUserId)
        .order("id", { ascending: false });

      setLinks((data ?? []) as LinkItem[]);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function addLink(link: NewLinkInput) {
    if (isAddingLink) return;

    setIsAddingLink(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("links")
        .insert(link)
        .select()
        .single();

      if (error) throw error;

      setLinks((prev) => [data as LinkItem, ...prev]);
    } finally {
      setIsAddingLink(false);
    }
  }

  async function updateLink(id: number, updates: LinkEditableFields) {
    const supabase = createClient();
    const { error } = await supabase
      .from("links")
      .update(updates)
      .eq("id", id);

    if (error) throw error;

    setLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, ...updates } : link)),
    );
  }

  async function deleteLink(id: number) {
    const supabase = createClient();
    const { error } = await supabase.from("links").delete().eq("id", id);

    if (error) throw error;

    setLinks((prev) => prev.filter((link) => link.id !== id));
  }

  return (
    <LinkContext.Provider
      value={{ links, isAddingLink, addLink, updateLink, deleteLink }}
    >
      {children}
    </LinkContext.Provider>
  );
}

export function useLinks() {
  const context = useContext(LinkContext);
  if (!context) {
    throw new Error("useLinks must be used within a LinkProvider");
  }
  return context;
}
