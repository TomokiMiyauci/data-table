import type { Item } from '@miyauci/data-table-core'

import { LOADING, NO_DATA, NO_SEARCH_RESULT } from '@/constants'
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
  if (loading) return LOADING
  if (!originItems.length) return NO_DATA
  if (!actualItems.length) return NO_SEARCH_RESULT
  else return ''
}

const length = <T>(input: readonly T[]): number => input.length

export { getTableState, length }
