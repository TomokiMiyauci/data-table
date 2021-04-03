import type { Item } from '@miyauci/data-table-core'

import type { TableState } from '@/types'

const getTableState = ({
  loading,
  originItems,
  actualItems
}: {
  loading: boolean
  originItems: readonly Item[]
  actualItems: readonly Item[]
}): TableState | '' => {
  if (loading) return 'LOADING'
  if (!originItems.length) return 'NO_DATA'
  if (!actualItems.length) return 'NO_SEARCH_RESULT'
  else return ''
}

export { getTableState }
