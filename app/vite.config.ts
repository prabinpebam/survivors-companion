import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
  plugins: [preact()],
  // Native file events were missed on this drive and served stale modules; polling is reliable.
  server: { host: '127.0.0.1', port: 5173, strictPort: true, watch: { usePolling: true, interval: 300 } },
  preview: { host: '127.0.0.1', port: 5174, strictPort: true },
});
