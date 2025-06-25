import { useRouter } from "@tanstack/react-router";
import React from "react";

interface useRedirectTimerProps {
  autoStart?: boolean;
  startTime?: number;
  redirectPath?: string;
}

interface RedirectTimerReturn {
  time: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
  isRunning: boolean;
}

export function useRedirectTimer({
  autoStart = false,
  startTime = 5,
  redirectPath = "/",
}: useRedirectTimerProps = {}): RedirectTimerReturn {
  const [time, setTime] = React.useState(startTime);
  const [isRunning, setIsRunning] = React.useState(false);
  const [hasRedirected, setHasRedirected] = React.useState(false);
  const router = useRouter();
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const stop = React.useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const start = React.useCallback(() => {
    if (timerRef.current) return;

    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  React.useEffect(() => {
    if (time === 0 && !isRunning && !hasRedirected) {
      setHasRedirected(true);
      router.navigate({ to: redirectPath, replace: true });
    }
  }, [time, isRunning, hasRedirected, router, redirectPath]);

  const reset = React.useCallback(() => {
    stop();
    setTime(startTime);
    setHasRedirected(false);
  }, [stop, startTime]);

  React.useEffect(() => {
    if (autoStart) start();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoStart, start]);

  return { time, start, stop, reset, isRunning };
}
