import { queryOptions } from "@tanstack/react-query";
import { fetchMusics } from "./music";

export const musicsQueryOptions = () =>
  queryOptions({
    queryKey: ["musics"],
    queryFn: () => fetchMusics(),
    retry: (failureCount, error) => {
      if ((error as any)?.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: 1000,
  });
