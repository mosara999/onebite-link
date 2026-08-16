"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { links as initialLinks } from "@/lib/mock-data";
import type { LinkItem } from "@/lib/types";

type NewLinkInput = Omit<LinkItem, "id">;
type LinkEditableFields = Pick<LinkItem, "title" | "description" | "folderId">;

type LinkContextValue = {
  links: LinkItem[];
  addLink: (link: NewLinkInput) => void;
  updateLink: (id: string, updates: LinkEditableFields) => void;
  deleteLink: (id: string) => void;
};

const LinkContext = createContext<LinkContextValue | null>(null);

export function LinkProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks);

  function addLink(link: NewLinkInput) {
    const newLink: LinkItem = { ...link, id: `link-${Date.now()}` };
    setLinks((prev) => [newLink, ...prev]);
  }

  function updateLink(id: string, updates: LinkEditableFields) {
    setLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, ...updates } : link)),
    );
  }

  function deleteLink(id: string) {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  }

  return (
    <LinkContext.Provider value={{ links, addLink, updateLink, deleteLink }}>
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
