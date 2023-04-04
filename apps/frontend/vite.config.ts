import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  build: {
    // outDir に manifest.json を出力
    manifest: true,
    rollupOptions: {
      // デフォルトの .html エントリを上書き
      input: 'src/init.tsx',
    },
  },
  plugins: [
		react(),
		tsconfigPaths(),
	],
});
