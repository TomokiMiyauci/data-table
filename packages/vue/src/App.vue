<template>
  <div class="container mx-auto">
    <div class="text-right mb-4">
      <input
        v-model="search"
        placeholder="search"
        type="search"
        class="shadow p-2"
      />
    </div>
    <div
      class="shadow overflow-hidden transition duration-200 rounded hover:shadow-md"
    >
      <DataTable
        :headers="headers"
        :items="items"
        :search="search"
        :pagination="[2, 3, 'ALL']"
        :loading="loading"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Header, Item } from '@share'
import ky from 'ky'
import { ref } from 'vue'

import DataTable from '@/components/DataTable.vue'

const headers: Header[] = [
  {
    text: 'Framework',
    value: 'framework'
  },
  {
    text: 'Platform',
    value: 'platform'
  }
]

const items = ref<Item[]>([])
const loading = ref<boolean>(false)
loading.value = true
ky.get('http://localhost:3004/posts')
  .json<Item[]>()
  .then((r) => {
    items.value = r
  })
  .catch((e) => {
    console.error(e)
  })
  .finally(() => {
    loading.value = false
  })

const search = ref('')
</script>
