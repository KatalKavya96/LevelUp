"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { formatSeconds } from "@/lib/utils";

export const useTimer = (durationSeconds: number) => {
  const [remainingSeconds, setRemainingSeconds] = useState(durationSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setRemainingSeconds(durationSeconds);
    setIsRunning(false);
  }, [durationSeconds]);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setRemainingSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(intervalId);
          setIsRunning(false);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isRunning]);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setRemainingSeconds(durationSeconds);
  }, [durationSeconds]);

  const complete = useCallback(() => {
    setIsRunning(false);
    setRemainingSeconds(0);
  }, []);

  const progress = useMemo(() => {
    if (durationSeconds <= 0) {
      return 100;
    }

    return ((durationSeconds - remainingSeconds) / durationSeconds) * 100;
  }, [durationSeconds, remainingSeconds]);

  return {
    remainingSeconds,
    formattedTime: formatSeconds(remainingSeconds),
    isRunning,
    isComplete: remainingSeconds === 0,
    progress,
    start,
    pause,
    reset,
    complete
  };
};
