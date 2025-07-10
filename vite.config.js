import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Orovirtual-Assistant/',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true
  }
});
