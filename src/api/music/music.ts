import type { MusicType } from "./musicsTypes";
import axios from "axios";
export class MusicNotFoundError extends Error {}

export const fetchMusics = async () => {
  console.info(`Fetching musics...`);
  const { data }: { data: MusicType[] } = await axios
    .get<{ data: MusicType[] }>(`http://localhost:3000/api/music`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .catch((err) => {
      if (err.status === 404) {
        throw new MusicNotFoundError(`Music not found!`);
      }
      throw err;
    });

  return data;
};
