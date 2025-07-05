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
          // Luxury Gold & Black Theme
          "primary-red": "#D4AF37",      // Deep Gold
          "highlight-yellow": "#1A1A1A",  // Rich Black
          "light-bg": "#FDFBF7",          // Cream
          "dark-text": "#1A1A1A",         // Rich Black
          "deep-green": "#F5E6D3",        // Champagne
          "accent": "#B8860B",            // Darker Gold
          "secondary": "#2D2D2D",         // Dark Gray
          "muted": "#8B7355",             // Bronze
        },
      },
    },
  },
});
