import type { Order, Item } from './types'
import { sort } from 'rambda'
import { DEFAULT_ROWS } from './constants'

const getOrderBy = (payload: Order): Order => {
  switch (payload) {
    case 'ASC': {
      return 'DESC'
    }
    case 'DESC': {
      return 'ASC'
    }
  }
}

const getKey = (item: Item, key: string | string[]): string => {
  if (typeof key === 'string') return item[key]?.toString() || ''
  return key.map((k) => item[k]).join('-')
}

// const sortByNameCaseInsensitive = (key: string | number) =>
//   sortBy(compose(objectOrPrimitive, prop(key)))

const diff = (a: number | 'ALL', b: number | 'ALL'): number => {
  if (a === 'ALL' || b === 'ALL') return 1
  return a - b
}

const getInitRow = (
  row: number | boolean | (number | 'ALL')[],
  defaultRows = DEFAULT_ROWS
): number => {
  switch (typeof row) {
    case 'number': {
      return row
    }

    case 'boolean': {
      return defaultRows
    }

    case 'object': {
      const sorted = sort(diff, row)[0]
      return sorted === 'ALL' ? defaultRows : sorted || defaultRows
    }
  }
}

export { getOrderBy, getKey, diff, getInitRow }
