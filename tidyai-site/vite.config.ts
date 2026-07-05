import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Relative base: works at github.io/teddy.ai/ and at the custom domain root
  base: "./",
  plugins: [react(), tailwindcss()],
});
