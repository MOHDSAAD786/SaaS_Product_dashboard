import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // Ye line alias ke liye hai
    }
  },
  preview: {
    port: 4173,
    host: true,
    allowedHosts: ['saas-product-dashboard.onrender.com']
  }
})
