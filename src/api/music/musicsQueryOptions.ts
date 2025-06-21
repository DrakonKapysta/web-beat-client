import { queryOptions } from "@tanstack/react-query";
import { fetchMusics } from "./music";

export const musicsQueryOptions = () =>
  queryOptions({
    queryKey: ["musics"],
    queryFn: () => fetchMusics(),
    retry: 2,
    retryDelay: 1000,
  });
