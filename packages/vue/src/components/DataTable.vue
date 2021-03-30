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
      <tr v-for="(item, index) in sortedItems" :key="index">
        <td v-for="{ value } in headers" :key="value">
          {{ item[value] }}
        </td>
      </tr>
    </tbody>
    <tfoot></tfoot>
  </table>
</template>

<script setup lang="ts">
import type { Header, Item } from '@miyauci/data-table-core'
import { defineProps, toRefs } from 'vue'

import { useFilter, useSort } from '../hooks'

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
  }
})

const { items, headers, search } = toRefs(props)

const { items: filteredItems } = useFilter({
  items,
  headers,
  search
})

const { items: sortedItems, sort, getState } = useSort(filteredItems)

const onClick = (val: string | number) => sort(val)
</script>
