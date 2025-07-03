export interface UploadMusicData {
  title: string;
  author: string;
  album: string;
  genre: string;
  year: number;
  metadata?: Record<string, unknown>;
}
