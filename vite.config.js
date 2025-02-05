import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'

export default defineConfig({
  plugins: [eslintPlugin({ cache: false })],
  server: {
    host: 'localhost',
    port: 3000,
    cors: '*',
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
  },
  build: {
    minify: true,
    manifest: true,
    rollupOptions: {
      input: './src/main.js',
      output: {
        format: 'umd',
        entryFileNames: 'main.js',
        esModule: true,
        compact: true,
        globals: {
          jquery: '$',
          lenis: 'lenis',
          gsap: 'gsap',
          ScrollTrigger: 'gsap',
        },
      },
      external: ['jquery', 'lenis', 'gsap'], // Removed 'gsap'
    },
  },
})
