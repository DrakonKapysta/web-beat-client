import React, { memo, useContext } from "react";
import { Button } from "../ui/button";

interface TransportControlsStartProps {
  handlePlay?: () => void;
  isPlaying?: boolean;
}

export const TransportControlsStart: React.FC<TransportControlsStartProps> =
  memo(({ handlePlay, isPlaying }) => {
    return (
      <Button
        onClick={handlePlay}
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
    );
  });

TransportControlsStart.displayName = "TransportControlsStart";
