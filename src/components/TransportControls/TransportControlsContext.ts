import React from "react";

export interface TransportControlsContextProps {
  currentTime?: number;
  duration?: number;
  isPlaying?: boolean;
  handlePlayPause?: () => void;
  handleVolumeChange?: (volume: number[]) => void;
  seekTo?: (time: number) => void;
}

export const TransportControlsContext =
  React.createContext<TransportControlsContextProps | null>(null);
