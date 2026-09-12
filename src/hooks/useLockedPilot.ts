"use client";

import { useCallback, useEffect, useState } from "react";
import {
  PILOT_EVENT,
  readStoredPilotId,
  writeStoredPilotId,
} from "@/lib/pilot";

export function useLockedPilot() {
  const [pilotId, setPilotId] = useState<string | null>(null);

  useEffect(() => {
    setPilotId(readStoredPilotId());
    const sync = () => setPilotId(readStoredPilotId());
    window.addEventListener(PILOT_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(PILOT_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const lockPilot = useCallback((id: string) => {
    writeStoredPilotId(id);
    setPilotId(id);
  }, []);

  return { pilotId, lockPilot };
}
