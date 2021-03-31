<template>
  <table>
    <thead>
      <tr>
        <th v-for="{ text, value } in headers" :key="value">
          {{ text }}
          <button @click="onClick(value)">{{ getState(value) }}</button>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in pagedItems" :key="index">
        <td v-for="{ value } in headers" :key="value">
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
import { defineProps, toRefs, watch } from 'vue'

import type { NumberOrAll, Pagination } from '../hooks'
import { useFilter, usePagination, useSort } from '../hooks'

const props = defineProps({
  headers: {
    type: Array as () => Header[],
    default: () => []
  },
  items: {
    type: Array as () => Item[],
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

const { items, headers, search } = toRefs(props)
const { items: filteredItems, filter } = useFilter({
  items,
  headers
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
