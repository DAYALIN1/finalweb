import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import pugPlugin from 'vite-plugin-pug';

export default defineConfig({
  plugins: [react(), pugPlugin()],
});