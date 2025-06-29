import React, { memo } from "react";
import { Slider } from "../ui/slider";

interface TransportControlsVolumeProps {
  handleVolumeChange: (value: number[]) => void;
}

export const TransportControlsVolume: React.FC<TransportControlsVolumeProps> =
  memo(({ handleVolumeChange }) => {
    return (
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
    );
  });
