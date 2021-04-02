import type { Item } from '@miyauci/data-table-core'
import { ComputedRef, Ref } from 'vue'

export type NumberOrAll = number | 'ALL'
export type ActionTypePage = 'NEXT' | 'PREV' | 'TO'
export type Pagination = {
  rows: ComputedRef<NumberOrAll[]>
  row: Ref<NumberOrAll>
  page: ComputedRef<number>
  pages: ComputedRef<number>
  items: ComputedRef<readonly Item[]>
  turnPage: <T extends ActionTypePage>(
    action: T extends 'TO' ? { type: T; to: number } : { type: T; to?: number }
  ) => void
  canPrev: ComputedRef<boolean>
  canNext: ComputedRef<boolean>
  isAllItemsInPage: ComputedRef<boolean>
}
