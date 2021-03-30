import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS({
      config: {
        preflight: false
      }
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueDataTable'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        sourcemap: true,
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
