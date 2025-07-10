import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/',
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
      },
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    },
    copyPublicDir: true
  },
  plugins: [
    {
      name: 'copy-public',
      closeBundle: () => {
        const fs = require('fs');
        const path = require('path');
        
        // Create .nojekyll file
        fs.writeFileSync(path.join('dist', '.nojekyll'), '');
        
        // Copy public directory
        const copyRecursiveSync = (src, dest) => {
          const exists = fs.existsSync(src);
          const stats = exists && fs.statSync(src);
          const isDirectory = exists && stats.isDirectory();
          
          if (isDirectory) {
            if (!fs.existsSync(dest)) {
              fs.mkdirSync(dest, { recursive: true });
            }
            fs.readdirSync(src).forEach(childItemName => {
              copyRecursiveSync(
                path.join(src, childItemName),
                path.join(dest, childItemName)
              );
            });
          } else {
            fs.copyFileSync(src, dest);
          }
        };
        
        if (fs.existsSync('public')) {
          copyRecursiveSync('public', 'dist');
        }
      }
    }
  ]
});
