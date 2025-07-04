import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  // Add Tailwind config if not present
  css: {
    preprocessorOptions: {
      // ... existing code ...
    },
  },
  // Add or update Tailwind config
  tailwindcss: {
    theme: {
      extend: {
        colors: {
          background: '#111827',   // bg-gray-900
          text: '#F9FAFB',         // text-gray-100
          accent: '#D4AF37',       // Gold (custom)
          secondary: '#1F2937',    // bg-gray-800
          muted: '#6B7280',        // text-gray-500
        },
      },
    },
  },
});
