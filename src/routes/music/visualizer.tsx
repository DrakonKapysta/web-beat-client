import { useCallback, useEffect, useRef, useState } from "react";
import { useAudio } from "@/hooks/useAudio";
import { musicsQueryOptions } from "@/api/music/musicsQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { MusicLoader } from "@/components/MusicLoader";
import { MusicError } from "@/components/MusicError";
import { EditorHeader } from "@/components/EditorHeader";
import { SideTrackList } from "@/components/SideTrackList";
import { TimeRuler } from "@/components/TimeRuler";
import { EditorToolsPannel } from "@/components/EditorToolsPannel";
import { TransportControls } from "@/components/TransportControls/TransportControls";

export const Route = createFileRoute({
  component: MusicEditor,
});

function MusicEditor() {
  const {
    isPlaying,
    handlePlayPause,
    handleVolumeChange,
    pauseAudio,
    getVolume,
    initCanvas,
    isLoading: isAudioLoading,
    canvasHelperRef,
    audioRef,
    canvasRef,
    currentTime,
    duration,
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
          `http://localhost:3000/api/music/stream/${selectedAudio ? selectedAudio : musics[0].fileHash + "." + musics[0].metadata?.extension}`
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
            <EditorHeader
              musics={musics}
              isMusicListOpen={isMusicListOpen}
              setIsMusicListOpen={setIsMusicListOpen}
              setSelectedAudio={setSelectedAudio}
              pauseAudio={pauseAudio}
            />

            {/* Editor Interface */}
            <div className="flex-1 flex flex-col space-y-6">
              {/* Transport Controls */}
              <TransportControls>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 mr-4">
                      <TransportControls.StartButton
                        handlePlay={handlePlayPause}
                        isPlaying={isPlaying}
                      />
                      <TransportControls.PrevButton />
                      <TransportControls.NextButton />
                    </div>
                    <TransportControls.Progress
                      currentTime={currentTime}
                      duration={duration}
                      seekTo={seekTo}
                    />
                    <div className="flex items-center space-x-4 shrink-0 ml-4">
                      <TransportControls.Time
                        currentTime={currentTime}
                        duration={duration}
                      />
                      <TransportControls.Volume
                        handleVolumeChange={handleVolumeChange}
                      />
                    </div>
                  </div>
                </div>
              </TransportControls>
              {/* Track Editor */}
              <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
                <div className="flex h-full">
                  {/* Track List */}
                  <SideTrackList tracks={tracks} />

                  {/* Timeline */}
                  <div className="flex-1 relative">
                    <div className="h-full bg-gray-900/30 relative overflow-hidden">
                      {/* Time ruler */}
                      <TimeRuler duration={duration} />

                      {/* Waveform visualization */}
                      <div className="p-4 space-y-4">
                        {tracks.map((track) => (
                          <div key={track.id} className="h-16 relative">
                            <div
                              className={`h-full rounded-lg ${track.color} opacity-60 relative overflow-hidden`}
                            >
                              {/* Simulated waveform */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="flex items-center space-x-1 h-full w-full px-2"></div>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div
                          ref={(element: HTMLDivElement) => {
                            containerRef.current = element;
                            resizeCanvas();
                          }}
                          className="max-h-16 max-w-full"
                        >
                          <canvas
                            className="w-full max-h-16 rounded"
                            ref={(element: HTMLCanvasElement) => {
                              initCanvas(element);
                            }}
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
              <EditorToolsPannel />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
