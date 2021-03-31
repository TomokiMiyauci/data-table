<template>
  <input v-model="search" />
  <data-table
    :headers="headers"
    :items="items"
    :search="search"
    :pagination="[1, 2, 'ALL']"
  />
</template>

<script setup lang="ts">
import type { Header, Item } from '@miyauci/vue-data-table'
import { ref } from 'vue'
const headers: Header[] = [
  {
    text: 'hoge',
    value: 'name'
  },
  {
    text: 'fsf',
    value: 'hogsg'
  }
]
const items: Item[] = [
  { name: 1, hogsg: '1213' },
  { name: 22, hogsg: 'ffff' },
  { name: 1, hogsg: '1213' }
]
const search = ref('')
</script>
