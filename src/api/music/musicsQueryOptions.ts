import { queryOptions } from "@tanstack/react-query";
import { fetchMusics } from "./music";

export const musicsQueryOptions = () =>
  queryOptions({
    queryKey: ["musics"],
    queryFn: () => fetchMusics(),
    retry: 3,
    retryDelay: 1000,
  });
