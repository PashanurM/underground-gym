"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const SHARE_KEY = "forge-trainer-share";

type ShareState = Record<string, { active: boolean }>;

type TrainerShareContextValue = {
  ready: boolean;
  isShareActive: (trainerSlug: string) => boolean;
  setShareActive: (trainerSlug: string, active: boolean) => void;
};

const TrainerShareContext = createContext<TrainerShareContextValue | null>(
  null,
);

function loadShare(): ShareState {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(SHARE_KEY);
    return raw ? (JSON.parse(raw) as ShareState) : {};
  } catch {
    return {};
  }
}

export function TrainerShareProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<ShareState>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(loadShare());
    setReady(true);
  }, []);

  const isShareActive = useCallback(
    (trainerSlug: string) => Boolean(state[trainerSlug]?.active),
    [state],
  );

  const setShareActive = useCallback((trainerSlug: string, active: boolean) => {
    setState((prev) => {
      const next = { ...prev, [trainerSlug]: { active } };
      localStorage.setItem(SHARE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ ready, isShareActive, setShareActive }),
    [ready, isShareActive, setShareActive],
  );

  return (
    <TrainerShareContext.Provider value={value}>
      {children}
    </TrainerShareContext.Provider>
  );
}

export function useTrainerShare() {
  const ctx = useContext(TrainerShareContext);
  if (!ctx) {
    throw new Error("useTrainerShare must be used within TrainerShareProvider");
  }
  return ctx;
}
