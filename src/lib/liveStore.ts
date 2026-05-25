"use client";

import { useEffect, useState } from "react";

const KEY = "citec:live-talk-id";
const EVENT = "citec:live-change";

export function setLiveTalk(id: string | null) {
  if (typeof window === "undefined") return;
  if (id) localStorage.setItem(KEY, id);
  else localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent(EVENT, { detail: id }));
}

export function getLiveTalk(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(KEY);
}

export function useLiveTalk() {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    setId(getLiveTalk());
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setId(detail ?? null);
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setId(e.newValue);
    };
    window.addEventListener(EVENT, onChange);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return id;
}
