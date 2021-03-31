import { createApp } from 'vue'
import plugin, { useSort } from '@miyauci/vue-data-table'
import App from './App.vue'

import '../../../packages/vue/dist/style.css'
createApp(App).use(plugin()).mount('#app')
