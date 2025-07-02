import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { musicsQueryOptions } from "@/api/music/musicsQueryOptions";
import type { MusicType } from "@/api/music/musicsTypes";
import { MusicLoader } from "@/components/MusicLoader";
import { MusicError } from "@/components/MusicError";
import { useQuery } from "@tanstack/react-query";
import {
  Play,
  Pause,
  Plus,
  Search,
  Heart,
  Music,
  Clock,
  User,
  Calendar,
  Filter,
} from "lucide-react";
import { useState, useMemo } from "react";
import { formatTime } from "@/lib/formatTime";

export const Route = createFileRoute({
  component: BrowseMusic,
});

function BrowseMusic() {
  const { data: musics, isLoading, error } = useQuery(musicsQueryOptions());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [playlist, setPlaylist] = useState<Set<string>>(new Set());

  // Фильтрация музыки
  const filteredMusics = useMemo(() => {
    if (!musics) return [];

    return musics.filter((music) => {
      const matchesSearch =
        music.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        music.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        music.album.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGenre =
        selectedGenre === "all" || music.genre === selectedGenre;

      return matchesSearch && matchesGenre;
    });
  }, [musics, searchQuery, selectedGenre]);

  // Уникальные жанры для фильтра
  const genres = useMemo(() => {
    if (!musics) return [];
    const uniqueGenres = [...new Set(musics.map((music) => music.genre))];
    return uniqueGenres.filter(Boolean);
  }, [musics]);

  const handlePlayPause = (musicId: string) => {
    setCurrentlyPlaying(currentlyPlaying === musicId ? null : musicId);
  };

  const toggleFavorite = (musicId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(musicId)) {
      newFavorites.delete(musicId);
    } else {
      newFavorites.add(musicId);
    }
    setFavorites(newFavorites);
  };

  const addToPlaylist = (musicId: string) => {
    const newPlaylist = new Set(playlist);
    if (newPlaylist.has(musicId)) {
      newPlaylist.delete(musicId);
    } else {
      newPlaylist.add(musicId);
    }
    setPlaylist(newPlaylist);
  };
  if (isLoading) return <MusicLoader />;
  if (error) return <MusicError error={error} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500 opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-pink-500 opacity-10 rounded-full animate-bounce"></div>
        <div
          className="absolute bottom-20 left-32 w-24 h-24 bg-indigo-500 opacity-10 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Floating Music Notes */}
        <div className="absolute top-1/4 right-1/4 text-purple-300 opacity-20 animate-float">
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </div>
        <div
          className="absolute bottom-1/3 left-1/4 text-pink-300 opacity-20 animate-float"
          style={{ animationDelay: "1.5s" }}
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
              <Music className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Music Library
            </h1>
            <p className="text-gray-300 text-lg">
              Discover and explore your favorite tracks
            </p>
          </div>

          {/* Search and Filter Controls */}
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search by title, artist, or album..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400"
                />
              </div>

              {/* Genre Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:border-purple-400 focus:ring-purple-400"
                >
                  <option value="all">All Genres</option>
                  {genres.map((genre) => (
                    <option key={genre} value={genre} className="bg-gray-800">
                      {genre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-4 flex justify-between items-center text-sm text-gray-300">
              <span>{filteredMusics.length} tracks found</span>
              <span>
                {playlist.size} in playlist • {favorites.size} favorites
              </span>
            </div>
          </div>
        </div>

        {/* Music Grid */}
        <div className="max-w-7xl mx-auto">
          {filteredMusics.length === 0 ? (
            <div className="text-center py-16">
              <Music className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                No music found
              </h3>
              <p className="text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMusics.map((music) => (
                <MusicCard
                  key={music._id}
                  music={music}
                  isPlaying={currentlyPlaying === music._id}
                  isFavorite={favorites.has(music._id)}
                  isInPlaylist={playlist.has(music._id)}
                  onPlayPause={() => handlePlayPause(music._id)}
                  onToggleFavorite={() => toggleFavorite(music._id)}
                  onAddToPlaylist={() => addToPlaylist(music._id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface MusicCardProps {
  music: MusicType;
  isPlaying: boolean;
  isFavorite: boolean;
  isInPlaylist: boolean;
  onPlayPause: () => void;
  onToggleFavorite: () => void;
  onAddToPlaylist: () => void;
}

function MusicCard({
  music,
  isPlaying,
  isFavorite,
  isInPlaylist,
  onPlayPause,
  onToggleFavorite,
  onAddToPlaylist,
}: MusicCardProps) {
  return (
    <div className="group bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Album Art / Music Icon */}
      <div className="relative mb-4">
        <div className="aspect-square bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-3 relative overflow-hidden">
          {music.posterUrl ? (
            <img
              src={`http://localhost:3000/${music.posterUrl}`}
              alt={music.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <Music className="w-12 h-12 text-white" />
          )}

          {/* Play Overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              onClick={onPlayPause}
              size="sm"
              className="bg-white/20 hover:bg-white/30 border-none rounded-full w-12 h-12 flex items-center justify-center"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white ml-1" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Music Info */}
      <div className="mb-4">
        <h3
          className="font-semibold text-white text-lg mb-1 line-clamp-1"
          title={music.title}
        >
          {music.title}
        </h3>
        <p className="text-gray-300 text-sm mb-1 flex items-center">
          <User className="w-3 h-3 mr-1" />
          {music.author}
        </p>
        <p
          className="text-gray-400 text-xs mb-1 line-clamp-1"
          title={music.album}
        >
          {music.album}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {music.year}
          </span>
          <span className="px-2 py-1 bg-purple-500/20 rounded-full text-purple-300">
            {music.genre}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-3 border-t border-white/10">
        <Button
          onClick={onToggleFavorite}
          variant="ghost"
          size="sm"
          className={`hover:bg-white/10 ${
            isFavorite
              ? "text-red-400 hover:text-red-300"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
        </Button>

        <Button
          onClick={onAddToPlaylist}
          variant="ghost"
          size="sm"
          className={`hover:bg-white/10 ${
            isInPlaylist
              ? "text-green-400 hover:text-green-300"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Plus
            className={`w-4 h-4 ${isInPlaylist ? "rotate-45" : ""} transition-transform`}
          />
        </Button>

        <div className="text-xs text-gray-400 flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          {music.metadata?.duration
            ? `${formatTime(music.metadata.duration)}`
            : "--:--"}
        </div>
      </div>
    </div>
  );
}
