import { musicsQueryOptions } from "@/api/music/musicsQueryOptions";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const Route = createFileRoute({
  component: About,
});

function About() {
  const { data: musics, isLoading, error } = useQuery(musicsQueryOptions());
  const [tracks] = useState([
    { id: 1, name: "Vocal", color: "bg-purple-500", active: true },
    { id: 2, name: "Guitar", color: "bg-blue-500", active: true },
    { id: 3, name: "Bass", color: "bg-green-500", active: false },
    { id: 4, name: "Drums", color: "bg-red-500", active: true },
  ]);
  const [forsedUpdate, setForcedUpdate] = useState(0);
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
      <Button onClick={() => setForcedUpdate((prev) => prev + 1)}>
        Update
      </Button>
      <div className="p-4 space-y-4">
        {tracks.map((track) => (
          <div key={track.id} className="h-16 relative">
            <div
              className={`h-full rounded-lg ${track.color} opacity-60 relative overflow-hidden`}
            >
              {/* Simulated waveform */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center space-x-1 h-full w-full px-2">
                  {Array.from({ length: 208 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-white/40 rounded-full"
                      style={{
                        width: "2px",
                        height: `${Math.random() * 80 + 20}%`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {musics?.map((music) => <div key={music._id}>{music.title}</div>)}
    </div>
  );
}
