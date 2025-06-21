import { musicsQueryOptions } from "@/api/music/musicsQueryOptions";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute({
  component: About,
});

function About() {
  const { data: musics, isLoading, error } = useQuery(musicsQueryOptions());

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-amber-300">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
        <p className="text-white">Загружаем треки...</p>
      </div>
    );
  }
  if (error) {
    return <div>Error loading musics: {error.message}</div>;
  }

  return (
    <div>
      {musics?.map((music) => <div key={music._id}>{music.fileName}</div>)}
    </div>
  );
}
