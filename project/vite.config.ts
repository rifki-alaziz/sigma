import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    host: true,      // ← WAJIB agar tampil "Network: http://IP:5173"
    port: 5173,      // port default
  },

  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
