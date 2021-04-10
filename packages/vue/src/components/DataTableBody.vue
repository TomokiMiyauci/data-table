<template>
  <tbody :class="tbody">
    <tr v-for="(item, index) in items" :key="index" :class="tr">
      <td v-for="{ value } in headers" :key="value" :class="td">
        {{ item[value] }}
      </td>
    </tr>
  </tbody>
</template>

<script setup lang="ts">
import type { Header, Item } from '@share'
import type { PropType } from 'vue'
import { defineProps } from 'vue'

defineProps({
  headers: {
    type: Array as PropType<readonly Header[]>,
    default: () => []
  },
  items: {
    type: Array as PropType<readonly Item[]>,
    default: () => []
  },
  tbody: String,
  tr: String,
  td: String
})
</script>
