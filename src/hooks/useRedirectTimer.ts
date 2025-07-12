import { useNavigate, useRouter } from "@tanstack/react-router";
import React from "react";

interface useRedirectTimerProps {
  autoStart?: boolean;
  invalidate?: boolean;
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
  invalidate = false,
}: useRedirectTimerProps = {}): RedirectTimerReturn {
  const [time, setTime] = React.useState(startTime);
  const [isRunning, setIsRunning] = React.useState(false);
  const [hasRedirected, setHasRedirected] = React.useState(false);
  const navigate = useNavigate();
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
    const handleRedirect = async () => {
      if (time === 0 && !isRunning && !hasRedirected) {
        setHasRedirected(true);
        if (invalidate) {
          await router.invalidate();
        }
        await navigate({ to: redirectPath });
      }
    };
    handleRedirect();
  }, [time, isRunning, hasRedirected, redirectPath]);

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
