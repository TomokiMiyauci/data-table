import { computed, ref } from 'vue'

import { NumberOrAll } from '@/hooks/usePagination/types'
import { useRow } from '@/hooks/usePagination/useRow'

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

export { useRows }
