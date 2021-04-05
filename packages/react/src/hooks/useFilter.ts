import { Item, Header, toStringOrNumber } from '@miyauci/data-table-core'
import { isUndefinedOrTrue } from '@miyauci/data-table-core'
import { useState } from 'react'

const lowerCase = (val: string): string => val.toLowerCase()
// const fnStringNumber = <T = void>(
//   val: string | number,
//   fnString: Function,
//   fnNumber: Function
// ): T => {
//   return typeof val === 'string' ? fnString() : fnNumber()
// }

const useFilter = ({
  items,
  headers
}: {
  items: Item[]
  headers: Header[]
}) => {
  const [_items, setItems] = useState(items)
  const filter = (search: string | number): void => {
    const lowerCaseSearch =
      typeof search === 'string' ? lowerCase(search) : search
    if (!lowerCaseSearch) return
    const filterableHeaderValues = headers
      .filter(({ filterable }) => isUndefinedOrTrue(filterable))
      .map(({ value, filter }) => ({ value, filter }))
    if (!filterableHeaderValues.length) return

    const tmp = items.filter((item) =>
      filterableHeaderValues.some(({ value: v, filter }) => {
        const value = item[v]
        if (typeof filter === 'function') {
          return filter(value, toStringOrNumber(lowerCaseSearch, 'string'))
        }
        if (typeof value === 'string') {
          return lowerCase(value).includes(
            toStringOrNumber(lowerCaseSearch, 'string')
          )
        } else if (typeof value === 'number') {
          return value === lowerCaseSearch
        } else if (value instanceof Date) {
          return value
            .toLocaleString()
            .includes(toStringOrNumber(lowerCaseSearch, 'string'))
        }
      })
    )

    setItems(tmp)
  }

  return {
    items: _items,
    filter
  }
}

export { useFilter }
