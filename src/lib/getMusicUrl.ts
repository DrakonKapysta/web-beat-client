import type { MusicType } from "@/api/music/musicsTypes";

export const getMusicUrl = (music: MusicType) => {
  return music.fileHash + "." + music.metadata?.extension;
};
