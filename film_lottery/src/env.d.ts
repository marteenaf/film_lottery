/// <reference types="vite/client" />

interface ImportMeta {
  env: {
    VITE_BACKEND_URL: string;
    VITE_MONGO_DATABASE: string;
    VITE_MONGO_LISTS_COLLECTION: string;
    VITE_MOVIE_DB_KEY: string;
    VITE_MOVIE_AUTH_DB: string;
  };
}