import React, { memo, type FC } from "react";
import { Button } from "./ui/button";

interface SideTrackListProps {
  tracks: {
    id: number;
    name: string;
    color: string;
    active: boolean;
  }[];
}

export const SideTrackList: FC<SideTrackListProps> = memo(({ tracks }) => {
  return (
    <div className="w-48 bg-black/20 border-r border-white/10">
      <div className="p-4 border-b border-white/10">
        <h3 className="text-white font-semibold">Tracks</h3>
      </div>
      <div className="space-y-1 p-2">
        {tracks.map((track) => (
          <div
            key={track.id}
            className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
              track.active ? "bg-white/20" : "bg-white/5 hover:bg-white/10"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${track.color}`}></div>
              <span className="text-white text-sm font-medium">
                {track.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-white/10 mt-auto">
        <Button
          variant="ghost"
          className="w-full text-purple-400 hover:bg-white/10"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Track
        </Button>
      </div>
    </div>
  );
});
