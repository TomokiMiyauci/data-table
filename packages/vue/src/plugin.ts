import { COMPONENT_NAME } from '@share'
import { Plugin } from 'vue'

import DataTable from '@/components/DataTable.vue'

const plugin = (): Plugin => ({
  install: (app) => {
    app.component(COMPONENT_NAME, DataTable)
  }
})

export { plugin }
