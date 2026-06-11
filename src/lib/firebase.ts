"use client";

import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getDatabase, type Database } from "firebase/database";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/** true quando todas as variáveis essenciais do Firebase estão presentes. */
export const firebaseEnabled = Boolean(config.apiKey && config.databaseURL);

let app: FirebaseApp | null = null;
let db: Database | null = null;

/** Retorna a instância do Realtime Database, ou null se o Firebase não estiver configurado. */
export function getDb(): Database | null {
  if (!firebaseEnabled) return null;
  if (!app) app = getApps().length ? getApp() : initializeApp(config);
  if (!db) db = getDatabase(app);
  return db;
}
