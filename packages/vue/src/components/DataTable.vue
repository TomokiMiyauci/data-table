<template>
  <table :class="table">
    <thead :class="thead">
      <tr>
        <th
          v-for="{ text, value } in headers"
          :key="value"
          :class="th"
          @click="onClick(value)"
        >
          <span class="cursor-auto" @click.stop>{{ text }}</span>
          <button
            class="rounded-full border w-6 h-6 cursor-pointer outline-none focus:(outline-none) active:(ring-4 ring-blue-500 bg-gray-200) shadow hover:(border-blue-500 shadow-md bg-gray-100 ring-2 ring-blue-200 ) p-1 opacity-50 group-hover:opacity-100 transition duration-200"
            @click="onClick(value)"
          >
            <div
              :class="[
                getState(value) === 'DESC' ? 'rotate-180 text-blue-500' : ''
              ]"
              class="transform transition duration-500"
            >
              <IconAccessibility />
            </div>
          </button>
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
    <tfoot v-if="pagination" class="bg-gray-50">
      <tr>
        <th class="py-2 px-4" colspan="2">
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
                <IconChevronLeft />
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
                <IconChevronRight />
              </button>
            </span>
          </div>
        </th>
      </tr>
    </tfoot>
  </table>
</template>

<script setup lang="ts">
import type { Header, Item } from '@miyauci/data-table-core'
import IconAccessibility from 'virtual:vite-icons/carbon/arrow-down'
import IconChevronLeft from 'virtual:vite-icons/carbon/chevron-left'
import IconChevronRight from 'virtual:vite-icons/carbon/chevron-right'
import type { PropType } from 'vue'
import { computed, defineProps, toRefs, watch } from 'vue'

import type { NumberOrAll, Pagination } from '@/hooks'
import { useFilter, usePagination, useSort } from '@/hooks'
const onInput = (a: any) => {
  turnPage({ type: 'TO', to: Number(a.target.value) })
}
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
  'group p-2 space-x-3 cursor-pointer sm:p-3 lg:p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase hover:(bg-gray-100)'
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
  turnPage,
  page,
  canNext,
  canPrev,
  rows,
  row,
  p,
  isAllItemsInPage
} =
  typeof props.pagination === 'boolean'
    ? ({ items: sortedItems } as Pagination)
    : usePagination(sortedItems, props.pagination)

const onClick = (val: string | number) => sort(val)
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
