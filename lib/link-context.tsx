"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { links as initialLinks } from "@/lib/mock-data";
import type { LinkItem } from "@/lib/types";

type NewLinkInput = Omit<LinkItem, "id">;

type LinkContextValue = {
  links: LinkItem[];
  addLink: (link: NewLinkInput) => void;
};

const LinkContext = createContext<LinkContextValue | null>(null);

export function LinkProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks);

  function addLink(link: NewLinkInput) {
    const newLink: LinkItem = { ...link, id: `link-${Date.now()}` };
    setLinks((prev) => [newLink, ...prev]);
  }

  return (
    <LinkContext.Provider value={{ links, addLink }}>
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
