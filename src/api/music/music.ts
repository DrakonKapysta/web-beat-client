import type { MusicType } from "./musicsTypes";
import axios from "axios";
export class MusicNotFoundError extends Error {}

export const fetchMusics = async () => {
  console.info(`Fetching musics...`);
  const musics: MusicType[] = await axios
    .get<MusicType[]>(`http://localhost:3000/api/music`)
    .then((r) => r.data)
    .catch((err) => {
      if (err.status === 404) {
        throw new MusicNotFoundError(`Music not found!`);
      }
      throw err;
    });

  return musics;
};
