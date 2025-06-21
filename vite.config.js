import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  build: {
    rollupOptions: {
      input: 'index.html', 
    },
  },
  plugins: [
    VitePWA({
      strategies: 'injectManifest',
      srcDir: '.',                     
      filename: 'sw.js',               
      injectManifest: {
        swSrc: 'sw-base.js',            
      },
      registerType: 'autoUpdate',
      manifest: {
        name: 'Qwerty App',
        short_name: 'Qwerty',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
