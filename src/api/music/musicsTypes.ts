export interface MusicType {
  _id: string;

  title: string;

  author: string;

  album: string;

  genre: string;

  year: number;

  posterUrl?: string;
  fileHash: string;
  filePath: string;

  metadata?: Record<string, any>;

  createdAt: string;
  updatedAt: string;
}
