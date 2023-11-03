/// <reference types="vite/client" />

interface ImportMeta {
  env: {
    VITE_BACKEND_URL: string;
    VITE_MONGO_DATABASE: string;
    VITE_MONGO_LISTS_COLLECTION: string;
  };
}