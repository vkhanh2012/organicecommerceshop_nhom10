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
        // Khai báo rõ ràng các trang HTML có trong dự án của bạn
        main: resolve(__dirname, 'index.html'),
        product: resolve(__dirname, 'product.html'), 
        
        /* Sau này nhóm có thêm trang nào (ví dụ: cart.html, login.html) 
           thì bạn cứ copy thêm dòng bỏ vào đây giống như vậy nhé: */
        // cart: resolve(__dirname, 'cart.html'),
      }
    }
  }
})