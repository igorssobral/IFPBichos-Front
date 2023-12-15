/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_APP_GOOGLE_CLIENT_ID: string;
  VITE_APP_DB_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
