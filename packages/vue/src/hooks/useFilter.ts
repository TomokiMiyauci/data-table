import { Ref, computed } from 'vue'
import type { Header, Item } from '@miyauci/data-table-core'
import { isUndefinedOrTrue, toStringOrNumber } from '@miyauci/data-table-core'

type Options = {
  headers: Ref<Header[]>
  items: Ref<Item[]>
  search: Ref<string | number>
}

const useFilter = ({ items, headers, search }: Options) => {
  const filterableHeaderValues = computed<Pick<Header, 'value' | 'filter'>[]>(
    () =>
      headers.value
        .filter(({ filterable }) => isUndefinedOrTrue(filterable))
        .map(({ value, filter }) => ({ value, filter }))
  )

  const lowerCaseSearch = computed<string | number>(() =>
    typeof search.value === 'string' ? search.value.toLowerCase() : search.value
  )

  const filteredItems = computed<Item[]>(() => {
    if (!lowerCaseSearch.value || !filterableHeaderValues.value.length)
      return items.value
    return items.value.filter((item) =>
      filterableHeaderValues.value.some(({ value: v, filter }) => {
        const value = item[v]
        if (typeof filter === 'function') {
          return filter(
            value,
            toStringOrNumber(lowerCaseSearch.value, 'string')
          )
        }
        if (typeof value === 'string') {
          return value
            .toLowerCase()
            .includes(toStringOrNumber(lowerCaseSearch.value, 'string'))
        } else if (typeof value === 'number') {
          return value === lowerCaseSearch.value
        } else if (value instanceof Date) {
          return value
            .toLocaleString()
            .includes(toStringOrNumber(lowerCaseSearch.value, 'string'))
        }
      })
    )
  })

  return {
    items: filteredItems
  }
}

export { useFilter }
