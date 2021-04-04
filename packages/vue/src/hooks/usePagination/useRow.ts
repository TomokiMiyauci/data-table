import { ref } from 'vue'

import { NumberOrAll } from '@/hooks/usePagination/types'

const useRow = (row: NumberOrAll) => {
  const _row = ref(row)
  const setRow = (row: NumberOrAll): void => {
    _row.value = row
  }

  return [_row, setRow] as const
}

export { useRow }
