import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { resolve } from 'path'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@share': resolve(__dirname, '..', 'core', 'src')
    }
  },
  plugins: [
    reactRefresh(),
    WindiCSS({
      config: {
        preflight: false
      }
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ReactDataTable'
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        exports: 'named',
        sourcemap: true,
        globals: {
          react: 'React'
        }
      }
    }
  }
})
