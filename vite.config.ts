import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],

    // WAJIB untuk Vercel
    base: '/',

    server: {
      port: 3000,
      host: '0.0.0.0'
    },

    // Gunakan import.meta.env untuk Vite
    define: {
      'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY)
    }
  };
});
