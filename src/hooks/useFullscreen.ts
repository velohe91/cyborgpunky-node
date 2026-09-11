"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Browser Fullscreen API helper for immersive mode.
 * Gracefully no-ops when the API is unavailable (e.g. some iOS browsers).
 */
export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported(typeof document !== "undefined" && !!document.documentElement.requestFullscreen);

    const onChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const enter = useCallback(async () => {
    if (!document.documentElement.requestFullscreen) return;
    try {
      await document.documentElement.requestFullscreen();
    } catch {
      // User gesture required or permission denied — silent fail
    }
  }, []);

  const exit = useCallback(async () => {
    if (!document.exitFullscreen) return;
    try {
      await document.exitFullscreen();
    } catch {
      // already exited
    }
  }, []);

  const toggle = useCallback(async () => {
    if (document.fullscreenElement) {
      await exit();
    } else {
      await enter();
    }
  }, [enter, exit]);

  return { isFullscreen, isSupported, enter, exit, toggle };
}
