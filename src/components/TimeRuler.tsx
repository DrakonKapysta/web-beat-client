import { formatTime } from "@/lib/formatTime";
import { cn } from "@/lib/utils";
import React, { memo, type FC } from "react";

interface TimeRulerProps {
  duration: number;
}

export const TimeRuler: FC<TimeRulerProps> = memo(({ duration }) => {
  return (
    <div className="h-8 bg-black/30 border-b border-white/10 flex items-center px-4">
      <div
        className={cn("flex flex-1 justify-between text-xs text-gray-300 mr-2")}
      >
        {duration > 150 && duration < 420
          ? new Array(Math.round(duration / 30))
              .fill(null)
              .map((_, index) => (
                <span key={index}>{formatTime(index * 30)}</span>
              ))
          : new Array(Math.round(8))
              .fill(null)
              .map((_, index) => (
                <span key={index}>{formatTime(index * (duration / 8))}</span>
              ))}

        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
});
