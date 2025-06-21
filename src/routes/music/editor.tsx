import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAudio } from "@/hooks/useAudio";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { musicsQueryOptions } from "@/api/music/musicsQueryOptions";

import { useQuery } from "@tanstack/react-query";
import { MusicLoader } from "@/components/MusicLoader";
import { MusicError } from "@/components/MusicError";
export const Route = createFileRoute({
  component: MusicEditor,
});

function MusicEditor() {
  const {
    isPlaying,
    handlePlayPause,
    handleVolumeChange,
    getVolume,
    isLoading: isAudioLoading,
    canvasHelperRef,
    audioRef,
    canvasRef,
    currentTime,
    duration,
    formatTime,
    seekTo,
  } = useAudio();
  const [tracks] = useState([
    { id: 1, name: "Vocal", color: "bg-purple-500", active: true },
    { id: 2, name: "Guitar", color: "bg-blue-500", active: true },
    { id: 3, name: "Bass", color: "bg-green-500", active: false },
    { id: 4, name: "Drums", color: "bg-red-500", active: true },
  ]);
  const [isMusicListOpen, setIsMusicListOpen] = useState(false);
  const { data: musics, isLoading, error } = useQuery(musicsQueryOptions());
  const [selectedAudio, setSelectedAudio] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const resizeCanvas = useCallback(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const rect = container.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;

    if (canvasHelperRef.current) {
      canvasHelperRef.current.setCanvasSize(canvas.width, canvas.height);
    }
  }, []);

  const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percentage = offsetX / rect.width;
    const newTime = percentage * duration;
    seekTo(newTime);
  };

  useEffect(() => {
    resizeCanvas();

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [resizeCanvas]);

  if (error) return <MusicError error={error} />;

  return (
    <>
      <audio
        ref={audioRef}
        src={
          musics &&
          musics[0] &&
          `http://localhost:3000/api/music/stream/${selectedAudio ? selectedAudio : musics[0].metadata?.originalName}`
        }
        crossOrigin="anonymous"
        className="hidden"
      />
      {isLoading || isAudioLoading ? (
        <MusicLoader />
      ) : (
        <div
          onClick={(e: React.MouseEvent) => {
            const target = e.target as HTMLElement;
            if (isMusicListOpen === false) return;
            const isPrevented = target.getAttribute("data-prevent-list");
            if (
              target.tagName !== "BUTTON" &&
              target.tagName !== "INPUT" &&
              target.tagName !== "SELECT" &&
              target.tagName !== "A" &&
              !isPrevented
            ) {
              console.log("Closing music list. Node name: ", target.nodeName);
              setIsMusicListOpen(false);
            }
          }}
          className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden "
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500 opacity-10 rounded-full animate-pulse"></div>
            <div className="absolute top-32 right-20 w-16 h-16 bg-pink-500 opacity-10 rounded-full animate-bounce"></div>
            <div
              className="absolute bottom-20 left-32 w-24 h-24 bg-indigo-500 opacity-10 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>

            {/* Floating Music Notes */}
            <div className="absolute top-1/4 right-1/4 text-purple-300 opacity-20 animate-float">
              <svg
                className="w-12 h-12"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
            </div>
            <div
              className="absolute bottom-1/3 left-1/4 text-pink-300 opacity-20 animate-float"
              style={{ animationDelay: "1.5s" }}
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
            </div>
          </div>
          {/* Main Content */}
          <div className="relative z-10 p-6 min-h-screen flex flex-col">
            {/* Header */}
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
                    <div className="max-h-72 overflow-y-auto">
                      {musics?.map((music) => (
                        <Button
                          onClick={() => {
                            console.log("CLICK");
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

            {/* Editor Interface */}
            <div className="flex-1 flex flex-col space-y-6">
              {/* Transport Controls */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 mr-4">
                    <Button
                      onClick={handlePlayPause}
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 flex items-center justify-center"
                    >
                      {isPlaying ? (
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                      ) : (
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </Button>

                    <Button
                      variant="ghost"
                      className="w-10 h-10 rounded-full text-white hover:bg-white/10"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                      </svg>
                    </Button>

                    <Button
                      variant="ghost"
                      className="w-10 h-10 rounded-full text-white hover:bg-white/10"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                      </svg>
                    </Button>

                    <Button
                      variant="ghost"
                      className="w-10 h-10 rounded-full text-white hover:bg-white/10"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
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

              {/* Track Editor */}
              <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
                <div className="flex h-full">
                  {/* Track List */}
                  <div className="w-48 bg-black/20 border-r border-white/10">
                    <div className="p-4 border-b border-white/10">
                      <h3 className="text-white font-semibold">Tracks</h3>
                    </div>
                    <div className="space-y-1 p-2">
                      {tracks.map((track) => (
                        <div
                          key={track.id}
                          className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                            track.active
                              ? "bg-white/20"
                              : "bg-white/5 hover:bg-white/10"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-3 h-3 rounded-full ${track.color}`}
                            ></div>
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

                  {/* Timeline */}
                  <div className="flex-1 relative">
                    <div className="h-full bg-gray-900/30 relative overflow-hidden">
                      {/* Time ruler */}
                      <div className="h-8 bg-black/30 border-b border-white/10 flex items-center px-4">
                        <div
                          className={cn(
                            "flex flex-1 justify-between text-xs text-gray-300 mr-2"
                          )}
                        >
                          {duration > 150 && duration < 420
                            ? new Array(Math.round(duration / 30))
                                .fill(null)
                                .map((_, index) => (
                                  <span key={index}>
                                    {formatTime(index * 30)}
                                  </span>
                                ))
                            : new Array(Math.round(8))
                                .fill(null)
                                .map((_, index) => (
                                  <span key={index}>
                                    {formatTime(index * (duration / 8))}
                                  </span>
                                ))}

                          <span>{formatTime(duration)}</span>
                        </div>
                      </div>

                      {/* Waveform visualization */}
                      <div className="p-4 space-y-4">
                        {tracks.map((track) => (
                          <div key={track.id} className="h-16 relative">
                            <div
                              className={`h-full rounded-lg ${track.color} opacity-60 relative overflow-hidden`}
                            >
                              {/* Simulated waveform */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="flex items-center space-x-1 h-full w-full px-2">
                                  {Array.from({ length: 208 }).map((_, i) => (
                                    <div
                                      key={i}
                                      className="bg-white/40 rounded-full"
                                      style={{
                                        width: "2px",
                                        height: `${Math.random() * 80 + 20}%`,
                                      }}
                                    ></div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div
                          ref={containerRef}
                          className=" max-h-16 max-w-full "
                        >
                          <canvas
                            className="w-full max-h-16 rounded"
                            ref={canvasRef}
                          ></canvas>
                        </div>
                      </div>

                      {/* Playhead */}
                      <div
                        className="absolute top-8 bottom-0 border-1 w-0 border-white shadow-lg z-10"
                        style={{
                          left: `${(currentTime / duration) * 99 <= 1 ? 1 : (currentTime / duration) * 99}%`,
                        }}
                      >
                        <div className="w-3 h-3 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tools Panel */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-300 text-sm">BPM:</span>
                      <input
                        type="number"
                        value="120"
                        className="w-16 px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-300 text-sm">Key:</span>
                      <select className="px-3 py-1 bg-white/10 border border-white/20 rounded text-white text-sm">
                        <option className="bg-gray-800" value="C">
                          C Major
                        </option>
                        <option className="bg-gray-800" value="D">
                          D Major
                        </option>
                        <option className="bg-gray-800" value="E">
                          E Major
                        </option>
                        <option className="bg-gray-800" value="F">
                          F Major
                        </option>
                        <option className="bg-gray-800" value="G">
                          G Major
                        </option>
                        <option className="bg-gray-800" value="A">
                          A Major
                        </option>
                        <option className="bg-gray-800" value="B">
                          B Major
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-white/10"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-10V4a2 2 0 00-2-2H5a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2V4z"
                        />
                      </svg>
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-white/10"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-white/10"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      ;
    </>
  );
}
