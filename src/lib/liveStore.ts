"use client";

import { useEffect, useState } from "react";
import { ref, onValue, set } from "firebase/database";
import { getDb, firebaseEnabled } from "./firebase";

const PATH = "live/talkId";

// ---- Fallback local (usado só quando o Firebase não está configurado) ----
const KEY = "citec:live-talk-id";
const EVENT = "citec:live-change";

function setLocal(id: string | null) {
  if (typeof window === "undefined") return;
  if (id) localStorage.setItem(KEY, id);
  else localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent(EVENT, { detail: id }));
}

function getLocal(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(KEY);
}

/** Define a palestra ao vivo. Propaga para todos os dispositivos via Realtime DB. */
export function setLiveTalk(id: string | null) {
  const db = getDb();
  if (db) {
    // Realtime DB não aceita undefined; usamos null para "offline".
    set(ref(db, PATH), id ?? null);
    return;
  }
  setLocal(id);
}

/** Hook reativo: retorna o id da palestra ao vivo (ou null). */
/**
 * Estado do "ao vivo".
 * `loading` é true até a primeira resposta da fonte de dados — evita o flash
 * do estado offline ("EM BREVE") antes do Firebase responder.
 */
export function useLiveTalk() {
  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDb();

    if (db) {
      const unsub = onValue(ref(db, PATH), (snap) => {
        const val = snap.val();
        setId(typeof val === "string" && val ? val : null);
        setLoading(false);
      });
      return () => unsub();
    }

    // Fallback local (sincroniza apenas entre abas do mesmo navegador).
    setId(getLocal());
    setLoading(false);
    const onChange = (e: Event) => setId((e as CustomEvent).detail ?? null);
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

  return { id, loading };
}

export { firebaseEnabled };
