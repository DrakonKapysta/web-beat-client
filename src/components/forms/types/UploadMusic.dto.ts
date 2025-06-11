export interface UploadMusicData {
  fileName: string;
  author: string;
  album: string;
  genre: string;
  year: number;
  posterUrl?: string;
  metadata?: Record<string, unknown>;
}
