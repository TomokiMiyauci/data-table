<template>
  <thead :class="thead">
    <tr>
      <th
        v-for="{ text, value } in headers"
        :key="value"
        :class="th"
        @click="$emit('click:row', value)"
      >
        <span class="cursor-auto" @click.stop>{{ text }}</span>
        <button
          class="rounded-full w-6 h-6 cursor-pointer p-1 opacity-50 group-hover:opacity-100"
          :class="[
            getState(value) ? 'border-blue-500 opacity-100 text-blue-500' : ''
          ]"
          @click="$emit('click:row', value)"
        >
          <div
            :class="[getState(value) === 'DESC' ? 'rotate-180' : '']"
            class="transform transition duration-500"
          >
            <carbon-arrow-down />
          </div>
        </button>
      </th>
    </tr>
  </thead>
</template>

<script setup lang="ts">
import type { Header } from '@share'
import type { PropType } from 'vue'
import { defineEmit, defineProps } from 'vue'
defineEmit(['click:row'])
defineProps({
  headers: {
    type: Array as PropType<Header[]>,
    default: () => []
  },
  thead: String,
  th: String,
  getState: { type: Function, required: true }
})
</script>

<style scoped>
button {
  @apply outline-none shadow border transition  hover:(border-blue-500 shadow-md bg-gray-100 ring-2 ring-blue-200) focus:(ring-2 border-blue-500 text-blue-500)  active:(ring-5 bg-gray-200) disabled:(opacity-50 cursor-not-allowed ring-0 border-transparent);
}
</style>
