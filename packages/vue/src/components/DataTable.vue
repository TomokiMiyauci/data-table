<template>
  <table :class="table">
    <data-table-header
      :headers="headers"
      :thead="thead"
      :th="th"
      :get-state="getState"
      @click:row="onClick"
    />

    <thead v-if="loading">
      <tr>
        <th class="p-0" :colspan="colspan">
          <ProgressBar />
        </th>
      </tr>
    </thead>
    <data-table-state :colspan="colspan" :state="tableState">
      <template #loading>
        {{ loadingText }}
      </template>

      <template #no-data>
        {{ noDataText }}
      </template>

      <template #no-search-result>
        {{ noSearchResultText }}
      </template>
    </data-table-state>

    <data-table-body
      :headers="headers"
      :items="pagedItems"
      :tbody="tbody"
      :tr="tr"
      :td="td"
    />

    <tfoot class="bg-gray-50">
      <tr>
        <th class="py-2 px-4" :colspan="colspan">
          <div class="flex text-left">
            <select v-model="row" class="rounded">
              <option v-for="num in rows" :key="num" :value="num">
                {{ num }}
              </option>
            </select>

            <span class="space-x-4 mx-auto">
              <button
                class="rounded p-1"
                :disabled="!canPrev"
                @click="turnPage({ type: 'PREV' })"
              >
                <carbon-chevron-left />
              </button>

              <span
                v-if="isAllItemsInPage"
                class="shadow p-2 px-3 rounded font-normal"
              >
                {{ pages }}
              </span>

              <select
                v-else
                class="px-1 py-2 rounded appearance-none"
                :value="page"
                @input="onInput"
              >
                <option
                  v-for="(row, index) in pages"
                  :key="row"
                  :value="index + 1"
                >
                  <span>{{ row }} / {{ pages }}</span>
                </option>
              </select>
              <button
                class="rounded p-1"
                :disabled="!canNext"
                @click="turnPage({ type: 'NEXT' })"
              >
                <carbon-chevron-right />
              </button>
            </span>
          </div>
        </th>
      </tr>
    </tfoot>
  </table>
</template>

<script lang="ts">
import type { Header, Item } from '@share'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'

import DataTableBody from '@/components/DataTableBody.vue'
import DataTableHeader from '@/components/DataTableHeader.vue'
import DataTableState from '@/components/DataTableState.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import { LOADING_TEXT, NO_DATA_TEXT, NO_SEARCH_RESULT_TEXT } from '@/constants'
import type { NumberOrAll } from '@/hooks'
import { useProps } from '@/hooks/useProps'

export default defineComponent({
  components: {
    DataTableState,
    DataTableHeader,
    DataTableBody,
    ProgressBar
  },
  props: {
    headers: {
      type: Array as PropType<Header[]>,
      default: () => []
    },
    items: {
      type: Array as PropType<Item[]>,
      default: () => []
    },
    search: {
      type: [String, Number],
      default: ''
    },
    pagination: {
      type: [Array, Boolean] as PropType<NumberOrAll[] | boolean>,
      default: () => []
    },

    loading: {
      type: Boolean,
      default: false
    },

    loadingText: {
      type: String,
      default: LOADING_TEXT
    },

    noDataText: {
      type: String,
      default: NO_DATA_TEXT
    },

    noSearchResultText: {
      type: String,
      default: NO_SEARCH_RESULT_TEXT
    }
  },

  setup(props) {
    const {
      colspan,
      items: pagedItems,
      sort,
      getState,
      page,
      pages,
      turnPage,
      canPrev,
      canNext,
      rows,
      row,
      isAllItemsInPage,
      tableState
    } = useProps(props)

    const onInput = ({ target }: Event): void =>
      turnPage({ type: 'TO', to: Number((target as HTMLInputElement).value) })
    const onClick = (val: string | number): void => sort(val)

    return {
      onInput,
      onClick,
      colspan,
      pagedItems,
      getState,
      page,
      pages,
      canPrev,
      canNext,
      rows,
      row,
      turnPage,
      isAllItemsInPage,
      tableState,
      table,
      thead,
      th,
      tbody,
      tr,
      td
    }
  }
})

const table = 'min-w-full divide-y divide-gray-200'
const thead = 'bg-gray-50 whitespace-nowrap uppercase'
const th =
  'group p-2 space-x-3 cursor-pointer sm:p-3 lg:p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase hover:(bg-gray-100)'
const tbody = 'bg-white divide-y divide-gray-200'
const tr = 'transition text-gray-600 hoverLbg-gray-100 hover:shadow-lg'
const td = 'px-2 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-4 whitespace-nowrap'
</script>

<style scoped>
* {
  @apply antialiased transition;
}

table {
  @apply text-gray-600;
}

button {
  @apply outline-none shadow border transition  hover:(border-blue-500 shadow-md bg-gray-100 ring-2 ring-blue-200) focus:(ring-2 border-blue-500 text-blue-500)  active:(ring-5 bg-gray-200) disabled:(opacity-50 cursor-not-allowed ring-0 border-transparent);
}

select {
  @apply outline-none shadow border cursor-pointer hover:(ring-2 ring-blue-200 border-blue-500 bg-gray-100) focus:(ring-2 ring-blue-200 border-blue-500 text-blue-500);
}
</style>
