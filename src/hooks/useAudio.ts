import { CanvasHelper } from "@/lib/CanvasHelper";
import { useCallback, useEffect, useRef, useState } from "react";

export const useAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const trackRef = useRef<MediaElementAudioSourceNode | null>(null);
  const modificatorsRef = useRef<Record<string, AudioNode>>({});
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasHelperRef = useRef<CanvasHelper | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setIsLoading(true);
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      if (audio.readyState >= 2) {
        setIsLoading(false);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const seekTo = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  useEffect(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    if (!audioRef.current) {
      return;
    }
    if (!trackRef.current) {
      const track = audioContextRef.current.createMediaElementSource(
        audioRef.current
      );

      trackRef.current = track;
      const gainNode = audioContextRef.current.createGain();
      const panner = audioContextRef.current.createStereoPanner();
      const visualizer = audioContextRef.current.createAnalyser();
      visualizer.fftSize = 1024;

      panner.pan.value = 0;
      modificatorsRef.current.gain = gainNode;
      modificatorsRef.current.panner = panner;
      modificatorsRef.current.visualizer = visualizer;

      track
        .connect(gainNode)
        .connect(panner)
        .connect(visualizer)
        .connect(audioContextRef.current.destination);
    }
    return () => {
      console.log("Cleaning up canvas helper");
      if (canvasHelperRef.current) {
        canvasHelperRef.current.stopAnimation();
        canvasHelperRef.current = null;
      }
    };
  }, []);

  const initCanvas = useCallback((canvasElement: HTMLCanvasElement) => {
    if (!canvasElement || !audioRef.current || !audioContextRef.current) return;

    if (canvasHelperRef.current && canvasRef.current === canvasElement) return;

    if (canvasHelperRef.current) {
      canvasHelperRef.current.stopAnimation();
      canvasHelperRef.current = null;
    }

    canvasRef.current = canvasElement;
    const visualizer = modificatorsRef.current.visualizer as AnalyserNode;
    if (!visualizer) return;

    const WIDTH = canvasRef.current.width || 300;
    const HEIGHT = canvasRef.current.height || 64;
    const data = new Uint8Array(visualizer.frequencyBinCount);
    const canvasHelper = new CanvasHelper(
      canvasRef.current,
      WIDTH,
      HEIGHT,
      data,
      visualizer.frequencyBinCount,
      visualizer
    );
    canvasHelper.setCanvasSize(WIDTH, HEIGHT);
    canvasHelper.init();
    canvasHelperRef.current = canvasHelper;

    console.log("Canvas helper initialized");
  }, []);

  const getVolume = useCallback(() => {
    if (modificatorsRef.current.gain) {
      return (modificatorsRef.current.gain as GainNode).gain.value;
    }
    return 0;
  }, []);

  const addModifier = useCallback((name: string, node: AudioNode) => {
    if (!trackRef.current || !audioContextRef.current) return;

    modificatorsRef.current[name] = node;

    trackRef.current.disconnect();

    let currentNode: AudioNode = trackRef.current;
    const modifiers = modificatorsRef.current;

    for (const key in modifiers) {
      if (modifiers[key] instanceof AudioNode) {
        currentNode.connect(modifiers[key]);
        currentNode = modifiers[key];
      }
    }

    currentNode.connect(audioContextRef.current.destination);
  }, []);

  const removeModifier = useCallback((name: string) => {
    if (!trackRef.current || !audioContextRef.current) return;

    delete modificatorsRef.current[name];

    trackRef.current.disconnect();

    let currentNode: AudioNode = trackRef.current;
    const modifiers = modificatorsRef.current;

    for (const key in modifiers) {
      if (modifiers[key] instanceof AudioNode) {
        currentNode.connect(modifiers[key]);
        currentNode = modifiers[key];
      }
    }

    currentNode.connect(audioContextRef.current.destination);
  }, []);

  const setupAudioTrack = useCallback(() => {
    if (!audioContextRef.current || !audioRef.current) return;

    if (trackRef.current) {
      trackRef.current.disconnect();
    }

    let currentNode: AudioNode = trackRef.current as AudioNode;
    const modifiers = modificatorsRef.current;
    for (const key in modifiers) {
      if (modifiers[key] instanceof AudioNode) {
        currentNode.connect(modifiers[key]);
        currentNode = modifiers[key];
      }
    }
    currentNode.connect(audioContextRef.current.destination);
  }, []);

  const pauseAudio = useCallback(() => {
    if (!audioRef.current || !audioContextRef.current) {
      return;
    }
    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume().catch((error) => {
        console.error("Error resuming audio context:", error);
      });
    }
    if (canvasHelperRef.current) {
      canvasHelperRef.current.stopAnimation();
    }
    setIsPlaying(false);
  }, []);

  const handlePlayPause = useCallback(() => {
    if (!audioRef.current || !audioContextRef.current) {
      return;
    }

    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume().catch((error) => {
        console.error("Error resuming audio context:", error);
      });
    }

    setIsPlaying((prev) => {
      if (prev) {
        audioRef.current?.pause();
        if (canvasHelperRef.current) {
          canvasHelperRef.current.stopAnimation();
        }
      } else {
        audioRef.current?.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
        if (canvasHelperRef.current) {
          canvasHelperRef.current.drawWave();
        }
      }
      return !prev;
    });
  }, []);

  const handleVolumeChange = useCallback((value: number[]) => {
    if (modificatorsRef.current.gain) {
      (modificatorsRef.current.gain as GainNode).gain.value = value[0];
    }
  }, []);

  const handlePannerChange = useCallback((value: number[]) => {
    if (modificatorsRef.current.panner) {
      (modificatorsRef.current.panner as StereoPannerNode).pan.value = value[0];
    }
  }, []);

  return {
    audioRef,
    audioContextRef,
    isPlaying,
    canvasRef,
    canvasHelperRef,
    currentTime,
    duration,
    isLoading,
    initCanvas,
    seekTo,
    getVolume,
    handlePlayPause,
    setupAudioTrack,
    handleVolumeChange,
    addModifier,
    pauseAudio,
    removeModifier,
    handlePannerChange,
  };
};
