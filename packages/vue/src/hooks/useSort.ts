import type { Item, Order } from '@miyauci/data-table-core'
import { objectOrPrimitive } from '@miyauci/data-table-core'
import { reverse } from 'rambda'
import { sortBy as _sortBy } from 'rambda'
import { computed, Ref, ref } from 'vue'

const getNextState = (type: Order | ''): Order | '' =>
  type === '' ? 'ASC' : type === 'ASC' ? 'DESC' : ''

const _getState = (sortBy: Ref<string | number>, type: Ref<Order | ''>) => (
  key: string | number
): Order | '' => {
  if (key !== sortBy.value) return ''
  return type.value
}

const useSort = (items: Ref<Item[]>) => {
  const _type = ref<Order | ''>('')
  const sortBy = ref<string | number>('')
  const sortedItems = computed(() => {
    if (!sortBy.value) return items.value

    const sorted = _sortBy<Item>((item) => {
      return objectOrPrimitive(item[sortBy.value])
    }, items.value)
    return _type.value === 'ASC' ? sorted : reverse(sorted)
  })

  const sort = (key: string | number, type?: Order) => {
    if (sortBy.value === key) {
      _type.value = type || getNextState(_type.value)
      sortBy.value = _type.value ? key : ''
    } else {
      sortBy.value = key
      _type.value = type || 'ASC'
    }

    sortMap.value[key] = type
  }

  const getState = _getState(sortBy, _type)
  const debug = computed(() => ({
    type: _type.value,
    sortBy: sortBy.value
  }))

  const sortMap = ref<Record<string, Order | undefined>>({})
  return {
    items: sortedItems,
    sort,
    sortMap,
    getState,
    debug
  }
}

export { useSort }
