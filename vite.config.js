import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import injectHTML from 'vite-plugin-html-inject'
import { resolve } from 'path'

export default defineConfig({
  base: './',
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
        shop2: resolve(__dirname, 'shop2.html'),
        cart: resolve(__dirname, 'cart.html'),
        signup: resolve(__dirname, 'signup.html'),
        signin: resolve(__dirname, 'signin.html'),
        about: resolve(__dirname, 'about.html'),
        wishlist: resolve(__dirname, 'wishlist.html'),
        checkout: resolve(__dirname, 'checkout.html'),
        descriptions: resolve(__dirname, 'descriptions.html')
      }
    }
  }
})
