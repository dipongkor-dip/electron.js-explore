
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config
export default defineConfig({
    plugins: [react()],
    build: {
    rollupOptions: {
      input: 'src/renderer.tsx', // এখানে renderer.tsx নিশ্চিত করুন
    },
  },
});
