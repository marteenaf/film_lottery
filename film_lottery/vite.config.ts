// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.VUE_APP_BACKEND_URL": JSON.stringify(env.VUE_APP_BACKEND_URL),
      "process.env.VUE_APP_MONGO_DATABASE": JSON.stringify(env.VUE_APP_MONGO_DATABASE),
      "process.env.VUE_APP_MOVIE_DB_KEY": JSON.stringify(env.VUE_APP_MOVIE_DB_KEY),
      "process.env.VUE_APP_MOVIE_AUTH_DB": JSON.stringify(env.VUE_APP_MOVIE_AUTH_DB),
      "process.env.VUE_APP_MONGO_LIST_COLLECTION": JSON.stringify(env.VUE_APP_MONGO_LIST_COLLECTION),
    },
    plugins: [vue()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "/src"),
      },
    },
    server: {
      port: 8080
    }
  };
});