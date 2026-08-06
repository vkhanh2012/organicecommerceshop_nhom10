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
        shop: resolve(__dirname, 'shop.html'),
        cart: resolve(__dirname, 'cart.html')
      }
    }
  }
})
