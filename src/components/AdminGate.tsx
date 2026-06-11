"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Lock } from "lucide-react";

const SESSION_KEY = "citec:admin-ok";

// Site é estático (output: export) — não há servidor para validar a senha.
// A checagem é feita no cliente contra NEXT_PUBLIC_ADMIN_PASSWORD.
// Isso barra acesso casual; não é segurança forte (a senha fica no bundle).
// Para proteção real, usar Cloudflare Access na frente da rota /admin.
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

export function AdminGate({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setAuthed(sessionStorage.getItem(SESSION_KEY) === "1");
    setReady(true);
  }, []);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!ADMIN_PASSWORD) {
      setError("Senha não configurada (NEXT_PUBLIC_ADMIN_PASSWORD).");
      return;
    }
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setAuthed(true);
    } else {
      setError("Senha incorreta.");
    }
  }

  // Evita flash da tela de senha antes de checar a sessão.
  if (!ready) return null;
  if (authed) return <>{children}</>;

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[250px] bg-pink/20 blur-[120px] rounded-full pointer-events-none" />

      <form
        onSubmit={onSubmit}
        className="relative w-full max-w-sm glass rounded-2xl border border-white/10 p-6 sm:p-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <Lock size={14} className="text-pink-light" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-pink-light">
            Painel administrativo
          </span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl leading-[0.95]">Acesso restrito</h1>
        <p className="font-serif italic text-sm text-white/60 mt-1.5">
          Informe a senha para gerenciar o ao vivo.
        </p>

        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          className="mt-5 w-full rounded-xl border border-white/10 bg-ink-soft px-4 py-3 text-sm outline-none focus:border-pink/50 transition-colors"
        />

        {error && <p className="mt-2 text-xs text-pink-light">{error}</p>}

        <button
          type="submit"
          disabled={!password}
          className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full bg-white text-ink px-5 py-3 text-sm font-medium transition-opacity disabled:opacity-40"
        >
          <Lock size={14} />
          Entrar
        </button>
      </form>
    </div>
  );
}
