import {
  Calendar,
  Clock,
  Heart,
  Music,
  Pause,
  Play,
  Plus,
  User,
} from "lucide-react";
import { Button } from "./ui/button";
import { formatTime } from "@/lib/formatTime";
import type { MusicType } from "@/api/music/musicsTypes";
import { memo } from "react";

interface MusicCardProps {
  music: MusicType;
  isPlaying: boolean;
  isFavorite: boolean;
  isInPlaylist: boolean;
  currentTime: number;
  handleProgressClick: (
    event: React.MouseEvent<HTMLDivElement>,
    duration: number
  ) => void;
  onPlayPause: () => void;
  onToggleFavorite: () => void;
  onAddToPlaylist: () => void;
}

export const MusicCard = memo(
  ({
    music,
    isPlaying,
    isFavorite,
    isInPlaylist,
    currentTime,
    handleProgressClick,
    onPlayPause,
    onToggleFavorite,
    onAddToPlaylist,
  }: MusicCardProps) => {
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
              {isPlaying && (
                <div
                  className="absolute w-[90%] bottom-2 cursor-pointer py-2 "
                  onClick={(event) =>
                    handleProgressClick(event, music.metadata?.duration || 0)
                  }
                >
                  <div className="w-full h-1 bg-red-50 z-50 bottom-2 rounded-md">
                    <div
                      className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2  w-4 h-4 rounded-full bg-purple-500"
                      style={{
                        left:
                          music.metadata?.duration > 0
                            ? `${(currentTime / music.metadata?.duration) * 100}%`
                            : "0%",
                      }}
                    ></div>
                  </div>
                </div>
              )}
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
);

MusicCard.displayName = "MusicCard";
