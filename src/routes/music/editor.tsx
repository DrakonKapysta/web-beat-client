import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useAudio } from "@/hooks/useAudio";

export const Route = createFileRoute({
  component: Editor,
});

function Editor() {
  const {
    audioRef,
    isPlaying,
    handlePlayPause,
    handleVolumeChange,
    handlePannerChange,
    removeModifier,
    setupAudioTrack,
  } = useAudio();

  return (
    <div>
      <h2>Audio Editor</h2>
      <audio ref={audioRef} src="/light-logo.mp3" controls></audio>
      <div className="flex gap-4 flex-col max-w-2xs">
        <Button className="max-w-full" onClick={handlePlayPause}>
          {isPlaying ? "Stop" : "Play"}
        </Button>
        <Button className="max-w-full" onClick={() => removeModifier("panner")}>
          Remove Panner
        </Button>
        <Button className="max-w-full" onClick={setupAudioTrack}>
          Reset Audio
        </Button>
        <div>
          <p>Volume</p>
          <Slider
            onValueChange={handleVolumeChange}
            step={0.01}
            defaultValue={[1]}
            max={2}
            min={0}
          />
        </div>
        <div>
          <p>Panner</p>
          <Slider
            onValueChange={handlePannerChange}
            step={0.01}
            defaultValue={[0]}
            max={1}
            min={-1}
          />
        </div>
      </div>
    </div>
  );
}
