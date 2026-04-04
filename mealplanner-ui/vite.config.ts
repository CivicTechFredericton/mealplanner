import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import relay from 'vite-plugin-relay'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    react(),
    relay,
    tsconfigPaths()
  ],
  server: {
    port: 3333,
    proxy: {
      '/graphql': {
        target: 'http://127.0.0.1:4000',
        changeOrigin: true,
      },
      '/cognito-users': {
        target: 'http://127.0.0.1:4000',
        changeOrigin: true,
      }
    }
  },
  build: {
    outDir: 'build',
    sourcemap: true,
  }
})
