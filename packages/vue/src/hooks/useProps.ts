import type { Header, Item } from '@miyauci/data-table-core'
import { computed, ComputedRef, watch } from 'vue'

import type { NumberOrAll, Pagination } from '@/hooks'
import { useFilter, usePagination, useSort } from '@/hooks'
import type { TableState } from '@/types'
import { getTableState, length } from '@/utils'

type UseProps = {
  items: ComputedRef<readonly Item[]>
  colspan: ComputedRef<number>
  tableState: ComputedRef<TableState | ''>
} & Pagination &
  Omit<ReturnType<typeof useSort>, 'items'> &
  Omit<ReturnType<typeof useFilter>, 'items'>

const useProps = (
  props: Readonly<{
    headers: Header[]
    items: Item[]
    search: string | number
    pagination: boolean | NumberOrAll[]
    loading: boolean
    loadingText: string
    noDataText: string
    noSearchResultText: string
  }>
): UseProps => {
  const { items: filteredItems, filter } = useFilter({
    items: computed(() => props.items),
    headers: computed(() => props.headers)
  })

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
    isAllItemsInPage
  } =
    typeof props.pagination === 'boolean'
      ? ({ items: sortedItems } as Pagination)
      : usePagination(sortedItems, props.pagination)

  const tableState = computed(() =>
    getTableState({
      loading: props.loading,
      originItems: props.items,
      actualItems: pagedItems.value
    })
  )

  watch(
    () => props.search,
    (now) => filter(now)
  )

  return {
    items: pagedItems,
    filter,
    colspan: computed<number>(() => length(props.headers)),
    sort,
    getState,
    pages,
    turnPage,
    page,
    canNext,
    canPrev,
    rows,
    row,
    isAllItemsInPage,
    tableState
  }
}

export { useProps }
