import type { Item, Order, StringOrNumber } from '@miyauci/data-table-core'
import { objectOrPrimitive } from '@miyauci/data-table-core'
import { Ord, reverse, sortBy as _sortBy } from 'rambda'
import { computed, ComputedRef, ref } from 'vue'

type OrderState = Order | ''

const getNextState = (type: OrderState): OrderState =>
  type === '' ? 'ASC' : type === 'ASC' ? 'DESC' : ''

const sortFn = (key: StringOrNumber) => (item: Item): Ord =>
  objectOrPrimitive(item[key])

const _getState = (sortBy: StringOrNumber, type: OrderState) => (
  key: StringOrNumber
): OrderState => {
  if (key !== sortBy) return ''

  return type
}

const simpleSort = (
  items: readonly Item[],
  type: OrderState
): readonly Item[] => (type === 'DESC' ? reverse(items) : items)

const getNextSortMap = ({
  key,
  prevKey,
  type,
  prevType
}: {
  key: StringOrNumber
  prevKey: StringOrNumber
  type?: OrderState
  prevType: OrderState
}): {
  type: OrderState
  key: StringOrNumber
} => {
  if (prevKey === key) {
    return {
      type: type || getNextState(prevType),
      key: prevType ? key : ''
    }
  } else {
    return {
      type: type || 'ASC',
      key
    }
  }
}

const sortItems = ({
  items,
  type,
  key
}: {
  items: Item[]
  type: OrderState
  key: StringOrNumber
}): readonly Item[] => {
  if (!key || !type) return items

  const sorted = _sortBy<Item>(sortFn(key), items)
  return simpleSort(sorted, type)
}

const useSort = (
  items: ComputedRef<Item[]>
): {
  items: ComputedRef<readonly Item[]>
  sort: (key: StringOrNumber, type?: OrderState | undefined) => void
  getState: ComputedRef<(key: StringOrNumber) => OrderState>
} => {
  const _type = ref<OrderState>('')
  const sortBy = ref<StringOrNumber>('')
  const sortedItems = computed(() =>
    sortItems({
      items: items.value,
      type: _type.value,
      key: sortBy.value
    })
  )

  const sort = (key: StringOrNumber, type?: OrderState) => {
    const { type: t, key: k } = getNextSortMap({
      key,
      type,
      prevType: _type.value,
      prevKey: sortBy.value
    })
    _type.value = t
    sortBy.value = k
  }

  const getState = computed(() => _getState(sortBy.value, _type.value))

  return {
    items: sortedItems,
    sort,
    getState
  }
}

export {
  _getState,
  getNextSortMap,
  getNextState,
  OrderState,
  simpleSort,
  sortFn,
  sortItems,
  useSort
}
