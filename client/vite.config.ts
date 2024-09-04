import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "@svgr/rollup";

export default defineConfig({
  plugins: [react(), svgr()],
  optimizeDeps: {
    include: ["recharts"], // Ensure recharts is included in the pre-bundling
  },
  server: {
    watch: {
      ignored: ["**/node_modules/**"], // Ensure node_modules changes don't trigger unnecessary rebuilds
    },
  },
  cacheDir: "node_modules/.vite", // Ensure a consistent cache directory
});
