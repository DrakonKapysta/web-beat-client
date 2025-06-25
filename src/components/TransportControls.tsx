import React, { type FC } from "react";
import { Button } from "./ui/button";
import { formatTime } from "@/lib/formatTime";
import { Slider } from "./ui/slider";

interface TransportControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  handlePlayPause: () => void;
  seekTo: (time: number) => void;
  handleVolumeChange: (value: number[]) => void;
}

export const TransportControls: FC<TransportControlsProps> = ({
  isPlaying,
  currentTime,
  duration,
  handlePlayPause,
  seekTo,
  handleVolumeChange,
}) => {
  const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percentage = offsetX / rect.width;
    const newTime = percentage * duration;
    seekTo(newTime);
  };
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 mr-4">
          <Button
            onClick={handlePlayPause}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 flex items-center justify-center"
          >
            {isPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </Button>

          <Button
            variant="ghost"
            className="w-10 h-10 rounded-full text-white hover:bg-white/10"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </Button>

          <Button
            variant="ghost"
            className="w-10 h-10 rounded-full text-white hover:bg-white/10"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </Button>

          <Button
            variant="ghost"
            className="w-10 h-10 rounded-full text-white hover:bg-white/10"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h12v12H6z" />
            </svg>
          </Button>
        </div>
        <div
          data-prevent-list
          className="w-full h-2 bg-gray-700 rounded-full cursor-pointer relative"
          onClick={handleProgressClick}
        >
          <div
            data-prevent-list
            className="h-full bg-purple-500 rounded-full transition-all duration-100"
            style={{
              width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
            }}
          />
          {/* Playhead */}
          <div
            data-prevent-list
            className="absolute top-1/2 w-4 h-4 bg-white rounded-full border-2 border-purple-500 transform -translate-y-1/2 -translate-x-1/2 cursor-pointer"
            style={{
              left: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
            }}
          />
        </div>

        <div className="flex items-center space-x-4 shrink-0 ml-4">
          <span className="text-white text-sm font-mono">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
            <Slider
              min={0}
              max={2}
              step={0.01}
              defaultValue={[1]}
              onValueChange={(value) => handleVolumeChange(value)}
              className="w-20 accent-purple-500 slider-purple"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
