import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // GitHub Pages serves the site from /Teddy.ai/
  base: "/Teddy.ai/",
  plugins: [react(), tailwindcss()],
});
