import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": "/src",
      "@models": "/src/models",
      "@components": "/src/components",
      "@views": "/src/views",
      "@store": "/src/store",
      "@assets": "/src/assets",
    },
  },
});
