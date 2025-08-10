import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    server: {
        port: 3000,
    },
    build: {
        outDir: 'dist',
        chunkSizeWarningLimit: 1500,
    },
    optimizeDeps: {
        include: ['@antv/x6-react-shape'] 
      },
      ssr: {
        noExternal: ['@antv/x6-react-shape'] 
      },
    plugins: [react()],
})
