import { useCallback, useEffect, useRef, useState } from "react";

export const useAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const trackRef = useRef<MediaElementAudioSourceNode | null>(null);
  const modificatorsRef = useRef<Record<string, AudioNode>>({});

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
      panner.pan.value = 0;
      modificatorsRef.current.gain = gainNode;
      modificatorsRef.current.panner = panner;

      track
        .connect(gainNode)
        .connect(panner)
        .connect(audioContextRef.current.destination);
    }
  }, []);

  const addModifier = useCallback(
    (name: string, node: AudioNode, options?: object) => {
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
    },
    []
  );

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
      } else {
        audioRef.current?.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
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
    handlePlayPause,
    setupAudioTrack,
    handleVolumeChange,
    addModifier,
    removeModifier,
    handlePannerChange,
  };
};
