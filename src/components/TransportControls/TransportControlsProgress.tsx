import React, { useContext, memo } from "react";
import { TransportControlsContext } from "./TransportControlsContext";

export interface TransportControlsProgressProps {
  seekTo?: (time: number) => void;
  currentTime?: number;
  duration?: number;
}

export const TransportControlsProgress: React.FC<
  TransportControlsProgressProps
> = (props) => {
  const context = useContext(TransportControlsContext);

  const currentTime = props.currentTime ?? context?.currentTime ?? 0;
  const duration = props.duration ?? context?.duration ?? 0;
  const seekTo = props.seekTo ?? context?.seekTo ?? (() => {});

  const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percentage = offsetX / rect.width;
    const newTime = percentage * duration;
    seekTo(newTime);
  };
  return (
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
  );
};
