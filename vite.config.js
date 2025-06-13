// vite.config.js (ESM style)
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/',
  root: resolve('src'),
  publicDir: resolve('src', 'public'),
  build: {
    outDir: resolve('dist'),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
});
