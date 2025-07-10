import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/Orovirtual-Assistant/',
  server: {
    port: 3000,
    open: true
  },
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    },
    copyPublicDir: true
  }
});
