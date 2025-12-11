import { useState, useEffect, useCallback } from "react";

export function useWorkoutTimer() {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!startTime || !isRunning) return;

    const interval = setInterval(() => {
      setElapsed(Date.now() - startTime);
    }, 100);

    return () => clearInterval(interval);
  }, [startTime, isRunning]);

  const start = useCallback(() => {
    if (!startTime) {
      setStartTime(Date.now());
    }
    setIsRunning(true);
  }, [startTime]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
    const finalElapsed = elapsed;
    setStartTime(null);
    setElapsed(0);
    return finalElapsed;
  }, [elapsed]);

  const formatTime = useCallback((ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }, []);

  return {
    elapsed,
    isRunning,
    start,
    pause,
    stop,
    formatTime,
  };
}
