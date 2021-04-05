import { createApp } from 'vue'
import plugin from '@miyauci/vue-data-table'
import App from './App.vue'
import '../../../node_modules/@miyauci/vue-data-table/dist/style.css'
createApp(App).use(plugin()).mount('#app')
