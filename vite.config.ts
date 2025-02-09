import path from 'path';
import react from '@vitejs/plugin-react';  // Ensure this package is installed
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],  // Using the react plugin
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),  // Setup an alias for the src folder
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],  // Exclude lucide-react from optimization
  },
});
