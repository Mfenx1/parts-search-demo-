import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      $shared: fileURLToPath(new URL('./src/shared', import.meta.url)),
      $features: fileURLToPath(new URL('./src/features', import.meta.url)),
    },
  },
  server: {
    port: 5174,
    host: true,
    proxy: {
      '/api/hsprice': {
        target: 'http://api.favorit-parts.ru',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/hsprice/, '/hs/hsprice/'),
      },
    },
  },
});
