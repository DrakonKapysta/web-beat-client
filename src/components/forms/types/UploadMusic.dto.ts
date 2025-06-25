export interface UploadMusicData {
  title: string;
  author: string;
  album: string;
  genre: string;
  year: number;
  posterUrl?: string;
  metadata?: Record<string, unknown>;
}
