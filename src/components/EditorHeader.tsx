import React, { memo, type FC } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import type { MusicType } from "@/api/music/musicsTypes";

interface EditorHeaderProps {
  isMusicListOpen: boolean;
  setSelectedAudio: (audioName: string) => void;
  musics: MusicType[] | undefined;
  setIsMusicListOpen: (isOpen: boolean) => void;
  pauseAudio?: () => void;
}

export const EditorHeader: FC<EditorHeaderProps> = memo(
  ({
    isMusicListOpen,
    setSelectedAudio,
    musics,
    setIsMusicListOpen,
    pauseAudio,
  }) => {
    return (
      <div className="mb-6">
        <div className="flex items-center justify-between relative ">
          <div className="flex items-center space-x-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Music Editor
              </h1>
              <p className="text-gray-300">
                Create and edit your musical masterpiece
              </p>
            </div>
          </div>

          <div className="flex items-center gap-x-3 ">
            <Button
              className="text-white bg-white/10 border-white/20"
              variant={"outline"}
              onClick={() => setIsMusicListOpen(!isMusicListOpen)}
            >
              <Search size={18} />
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white bg-white/10"
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
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Import
            </Button>

            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
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
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              Export
            </Button>
          </div>
          {isMusicListOpen && (
            <div
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
              }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 max-w-md w-full h-92 bg-[#2c343f80] border-white/20 border backdrop-blur-xs z-20"
            >
              <div className="flex items-center mb-4">
                <Search className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search music..."
                  className="w-full px-3 py-2 bg-transparent border border-white/20 rounded text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div className="flex flex-col gap-y-2 max-h-72 overflow-y-auto">
                {musics?.map((music) => (
                  <Button
                    onClick={() => {
                      setSelectedAudio(
                        music.fileHash + "." + music.metadata?.extension
                      );
                      if (pauseAudio) {
                        pauseAudio();
                      }
                    }}
                    key={music._id}
                    className="flex justify-start items-center h-12 text-md w-full  p-3 bg-white/10 hover:bg-white/20 rounded cursor-pointer"
                  >
                    <span className="text-white">{music.title}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

EditorHeader.displayName = "EditorHeader";
