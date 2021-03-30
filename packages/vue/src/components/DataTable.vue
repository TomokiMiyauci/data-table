<template>
  <table>
    <thead>
      <tr>
        <th v-for="header in headers" :key="header.value">
          {{ header.text }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td v-for="{ value } in headers" :key="value">
          {{ item[value] }}
        </td>
      </tr>
    </tbody>
    <tfoot></tfoot>
  </table>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Header, Item } from '@miyauci/data-table-core'

defineProps({
  headers: {
    type: Array as () => Header[],
    default: () => []
  },
  items: {
    type: Array as () => Item[],
    default: () => []
  }
})
</script>
