import type { Item } from '@miyauci/data-table-core'
import { computed, ComputedRef, watch } from 'vue'

import { useReducer } from '../useReducer'
import { NumberOrAll, Pagination } from './types'
import { reducer } from './usePage'
import { useRows } from './useRows'

const getRowsPerPage = ({
  row,
  items
}: {
  row: NumberOrAll
  items: readonly Item[]
}) => (row === 'ALL' ? items.length : row)

const calcPages = ({
  items,
  rows
}: {
  items: readonly Item[]
  rows: number
}) => {
  if (!items.length) return 1
  return Math.ceil(items.length / rows)
}

const calcPageItems = ({
  page,
  pages,
  items,
  rowsPerPage
}: {
  page: number
  pages: number
  items: readonly Item[]
  rowsPerPage: number
}): Item[] => {
  const tempPage = greaterThan(page, pages) ? pages : page

  return sliceItems(items, tempPage, rowsPerPage)
}

const sliceItems = (
  items: readonly Item[],
  page: number,
  rowsPerPage: number
): Item[] => {
  return items.slice(sliceStart(page, rowsPerPage), sliceEnd(page, rowsPerPage))
}

const sliceStart = (page: number, rowsPerPage: number): number =>
  (page - 1) * rowsPerPage
const sliceEnd = (page: number, rowsPerPage: number): number =>
  rowsPerPage + (page - 1) * rowsPerPage
const greaterThan = (a: number, b: number): boolean => a > b

const usePagination = (
  items: ComputedRef<readonly Item[]>,
  pagination: NumberOrAll[]
): Pagination => {
  const [_page, dispatch] = useReducer(reducer, 1)
  const page = computed<number>(() =>
    greaterThan(_page.value, pages.value) ? pages.value : _page.value
  )
  const { rows, row, setRow, setRows } = useRows(pagination)
  const rowsPerPage = computed<number>(() =>
    getRowsPerPage({ items: items.value, row: row.value })
  )

  const pages = computed<number>(() =>
    calcPages({
      items: items.value,
      rows: rowsPerPage.value
    })
  )

  const canNext = computed<boolean>(() => greaterThan(pages.value, page.value))
  const canPrev = computed<boolean>(() => greaterThan(page.value, 1))
  const next = (): void => {
    if (canNext.value) {
      dispatch({ type: 'inc' })
    }
  }

  const prev = (): void => {
    if (canPrev.value) {
      dispatch({ type: 'dec' })
    }
  }

  watch(row, () => {
    dispatch({
      type: 'reset'
    })
  })

  const pagedItems = computed<readonly Item[]>(() =>
    calcPageItems({
      page: page.value,
      pages: pages.value,
      rowsPerPage: rowsPerPage.value,
      items: items.value
    })
  )

  return {
    rows,
    row,
    page,
    pages,
    next,
    prev,
    items: pagedItems,
    canNext,
    canPrev
  }
}

export { usePagination }
export type { NumberOrAll, Pagination }
