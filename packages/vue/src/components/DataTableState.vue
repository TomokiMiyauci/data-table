<template>
  <tbody v-if="state === LOADING">
    <tr>
      <td :colspan="colspan" class="text-center p-4">
        <slot name="loading" />
      </td>
    </tr>
  </tbody>
  <tbody v-else-if="state === NO_DATA">
    <tr>
      <td :colspan="colspan" class="text-center p-4">
        <slot name="no-data" />
      </td>
    </tr>
  </tbody>
  <tbody v-else-if="state === NO_SEARCH_RESULT">
    <tr>
      <td :colspan="colspan" class="text-center p-4">
        <slot name="no-search-result" />
      </td>
    </tr>
  </tbody>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

import { LOADING, NO_DATA, NO_SEARCH_RESULT } from '@/constants'
import type { TableState } from '@/types'

defineProps({
  state: {
    type: String,
    default: '',
    validator: (val: TableState | '') =>
      [LOADING, NO_DATA, NO_SEARCH_RESULT, ''].includes(val)
  },

  colspan: {
    type: Number,
    required: true
  }
})
</script>
