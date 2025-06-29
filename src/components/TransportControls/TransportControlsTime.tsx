import { formatTime } from "@/lib/formatTime";
import React, { useContext, memo } from "react";
import { TransportControlsContext } from "./TransportControlsContext";

export interface TransportControlsTimeProps {
  currentTime?: number;
  duration?: number;
}

export const TransportControlsTime: React.FC<TransportControlsTimeProps> = (
  props
) => {
  const context = useContext(TransportControlsContext);

  const currentTime = props.currentTime ?? context?.currentTime ?? 0;
  const duration = props.duration ?? context?.duration ?? 0;

  return (
    <span className="text-white text-sm font-mono">
      {formatTime(currentTime)} / {formatTime(duration)}
    </span>
  );
};
