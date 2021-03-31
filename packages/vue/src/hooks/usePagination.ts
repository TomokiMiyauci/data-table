import type { Item } from '@miyauci/data-table-core'
import { computed, ComputedRef, Ref, ref, watch } from 'vue'

type NumberOrAll = number | 'ALL'
type Pagination = {
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

const usePagination = (
  items: ComputedRef<readonly Item[]>,
  pagination: NumberOrAll[],
  search: Ref<string | number>
): Pagination => {
  const page = ref<number>(1)
  const _tmpPage = ref<number>(page.value)
  const { rows, row, setRow, setRows } = useRows(pagination)
  const _rows = computed<number>(() =>
    row.value === 'ALL' ? items.value.length : row.value
  )

  const pages = computed<number>(() => {
    if (!pagination || typeof pagination === 'boolean' || !items.value.length)
      return 1
    return Math.ceil(items.value.length / _rows.value)
  })

  const canNext = computed<boolean>(() => page.value < pages.value)
  const canPrev = computed<boolean>(() => page.value > 1)
  const next = (): void => {
    if (canNext.value) {
      page.value++
    }
  }

  const prev = (): void => {
    if (canPrev.value) {
      page.value--
    }
  }

  watch(search, (now, prev) => {
    if (typeof prev === 'string' && !prev.length) {
      _tmpPage.value = page.value
      page.value = 1
    }
    if (typeof now === 'string' && now.length > 1) {
      page.value = 1
    }
    if (typeof now === 'string' && !now.length) {
      page.value = _tmpPage.value
      _tmpPage.value = 1
    }
  })

  watch(rows, () => {
    _tmpPage.value = 1
    page.value = 1
  })

  const pagedItems = computed<readonly Item[]>(() => {
    if (!pagination || typeof pagination === 'boolean') return items.value
    const tempPage = pages.value < page.value ? pages.value : page.value

    return items.value.slice(
      (tempPage - 1) * _rows.value,
      _rows.value + (tempPage - 1) * _rows.value
    )
  })

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

const useRow = (row: number | 'ALL') => {
  const _row = ref(row)
  const setRow = (row: number | 'ALL'): void => {
    _row.value = row
  }

  return [_row, setRow] as const
}

const useRows = <T extends NumberOrAll[]>(rows: T, init?: number) => {
  const _rows = ref(rows)
  const [row, setRow] = useRow(init ?? _rows.value[0])

  const computedRows = computed<T>(() => _rows.value)
  const setRows = (rows: T): void => {
    _rows.value = rows
  }

  return {
    rows: computedRows,
    row,
    setRow,
    setRows
  }
}

export { NumberOrAll, Pagination, usePagination }
