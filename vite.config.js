import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import injectHTML from 'vite-plugin-html-inject'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    {
      ...injectHTML(),
      enforce: 'pre'
    },
    tailwindcss()
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        product: resolve(__dirname, 'product.html'),
        cart: resolve(__dirname, "cart.html")
      }
    }
  }
})