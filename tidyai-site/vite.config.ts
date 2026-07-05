import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // GitHub Pages serves the site from /teddy.ai/
  base: "/teddy.ai/",
  plugins: [react(), tailwindcss()],
});
