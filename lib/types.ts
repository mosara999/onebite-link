export type Folder = {
  id: number;
  name: string;
  created_at?: string;
};

export type LinkItem = {
  id: string;
  title: string;
  url: string;
  description: string;
  thumbnail?: string;
  folderId: string;
};
