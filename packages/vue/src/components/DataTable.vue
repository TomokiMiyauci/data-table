<template>
  <table :class="table">
    <thead :class="thead">
      <tr>
        <th v-for="{ text, value } in headers" :key="value" :class="th">
          {{ text }}
          <button @click="onClick(value)">{{ getState(value) }}</button>
        </th>
      </tr>
    </thead>
    <tbody :class="tbody">
      <tr v-for="(item, index) in pagedItems" :key="index" :class="tr">
        <td v-for="{ value } in headers" :key="value" :class="td">
          {{ item[value] }}
        </td>
      </tr>
    </tbody>
    <tfoot v-if="pagination">
      <select v-model="row">
        <option v-for="num in rows" :key="num" :value="num">{{ num }}</option>
      </select>

      <button :disabled="!canPrev" @click="prev">prev</button>
      {{
        page
      }}-{{
        pages
      }}
      <button :disabled="!canNext" @click="next">next</button>
    </tfoot>
  </table>
</template>

<script setup lang="ts">
import type { Header, Item } from '@miyauci/data-table-core'
import type { PropType } from 'vue'
import { computed, defineProps, toRefs, watch } from 'vue'

import type { NumberOrAll, Pagination } from '../hooks'
import { useFilter, usePagination, useSort } from '../hooks'

const props = defineProps({
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
  }
})

const table = 'min-w-full divide-y divide-gray-200'
const thead = 'bg-gray-50 whitespace-nowrap uppercase'
const th =
  'p-2 sm:p-3 lg:p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
const tbody = 'bg-white divide-y divide-gray-200'
const tr = 'transition text-gray-600 hoverLbg-gray-100 hover:shadow-lg'
const td = 'px-2 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-4 whitespace-nowrap'
const { headers, search } = toRefs(props)
const { items: filteredItems, filter } = useFilter({
  items: computed(() => props.items),
  headers: computed(() => props.headers)
})
watch(search, (now) => filter(now))

const { items: sortedItems, sort, getState } = useSort(filteredItems)

const {
  items: pagedItems,
  pages,
  next,
  prev,
  page,
  canNext,
  canPrev,
  rows,
  row
} =
  typeof props.pagination === 'boolean'
    ? ({ items: sortedItems } as Pagination)
    : usePagination(sortedItems, props.pagination, search)

const onClick = (val: string | number) => sort(val)
</script>
