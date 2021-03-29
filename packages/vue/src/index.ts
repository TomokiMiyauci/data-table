import { Plugin } from 'vue'
import App from './App.vue'

const plugin = (): Plugin => ({
  install: (app: any) => {
    app.component('DataTable', App)
  }
})

export default plugin
export { App }
