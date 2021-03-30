import type { Header, Item } from '@miyauci/data-table-core'
import {
  isUndefinedOrTrue,
  lowerCase,
  toStringOrNumber
} from '@miyauci/data-table-core'
import { computed, ComputedRef, Ref, ref } from 'vue'

type Options = {
  headers: Ref<Header[]>
  items: Ref<Item[]>
}

const useFilter = ({
  items,
  headers
}: Options): {
  items: ComputedRef<Item[]>
  filter: (search: string | number) => void
} => {
  const _search = ref<string | number>('')
  const filterableHeaderValues = computed<Pick<Header, 'value' | 'filter'>[]>(
    () =>
      headers.value
        .filter(({ filterable }) => isUndefinedOrTrue(filterable))
        .map(({ value, filter }) => ({ value, filter }))
  )

  const filter = (search: string | number): void => {
    const lowerCaseSearch =
      typeof search === 'string' ? lowerCase(search) : search
    _search.value = lowerCaseSearch
  }

  const filteredItems = computed<Item[]>(() => {
    if (!_search.value || !filterableHeaderValues.value.length)
      return items.value
    return items.value.filter((item) =>
      filterableHeaderValues.value.some(({ value: v, filter }) => {
        const value = item[v]
        if (typeof filter === 'function') {
          return filter(value, toStringOrNumber(_search.value, 'string'))
        }
        if (typeof value === 'string') {
          return value
            .toLowerCase()
            .includes(toStringOrNumber(_search.value, 'string'))
        } else if (typeof value === 'number') {
          return value === _search.value
        } else if (value instanceof Date) {
          return value
            .toLocaleString()
            .includes(toStringOrNumber(_search.value, 'string'))
        }
      })
    )
  })

  return {
    items: filteredItems,
    filter
  }
}

export { useFilter }
