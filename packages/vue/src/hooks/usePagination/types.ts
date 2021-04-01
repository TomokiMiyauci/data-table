import type { Item } from '@miyauci/data-table-core'
import { ComputedRef, Ref } from 'vue'

export type NumberOrAll = number | 'ALL'
export type Pagination = {
  rows: ComputedRef<NumberOrAll[]>
  row: Ref<NumberOrAll>
  page: Ref<number>
  pages: ComputedRef<number>
  items: ComputedRef<readonly Item[]>
  next: () => void
  prev: () => void
  canPrev: ComputedRef<boolean>
  canNext: ComputedRef<boolean>
}
