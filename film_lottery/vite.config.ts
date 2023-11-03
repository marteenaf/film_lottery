// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  envPrefix: "VITE_",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "/src"),
    },
  },
  define: {
    "process.env": {},
  },
  server: {
    port: 8080
  }
});