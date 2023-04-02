import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    // outDir に manifest.json を出力
    manifest: true,
    rollupOptions: {
      // デフォルトの .html エントリを上書き
      input: 'src/init.tsx',
    },
  },
  plugins: [react()],
});
