import type { Header, Item, StringOrNumber } from '@miyauci/data-table-core'
import {
  isUndefinedOrTrue,
  lowerCase,
  toStringOrNumber
} from '@miyauci/data-table-core'
import type { ComputedRef, Ref } from 'vue'
import { computed, ref } from 'vue'
type FilterOptions = {
  headers: ComputedRef<Header[]>
  items: ComputedRef<Item[]>
}
type HeaderValueAndFilter = Pick<Header, 'value' | 'filter'>
type GetFilteredItems = {
  filterableHeaderValues: ComputedRef<HeaderValueAndFilter[]>
  search: Ref<StringOrNumber>
  items: Ref<Item[]>
}

const filterUndefinedOrTrue = ({ filterable }: Header): boolean =>
  isUndefinedOrTrue(filterable)
const mapValueFilter = ({ value, filter }: Header): HeaderValueAndFilter => ({
  value,
  filter
})
const getFilterableHeaderValues = (
  headers: Ref<Header[]>
): HeaderValueAndFilter[] =>
  headers.value.filter(filterUndefinedOrTrue).map(mapValueFilter)

const hasStringLetter = (val: string, search: StringOrNumber): boolean =>
  val.includes(toStringOrNumber(search, 'string'))
const hasNumberLetter = (val: number, search: StringOrNumber): boolean => {
  if (typeof search === 'string' && search === '') return true
  return val === search
}
const hasDateLetter = (val: Date, search: StringOrNumber): boolean =>
  val.toLocaleString().includes(toStringOrNumber(search, 'string'))
const someCheck = ({
  item,
  search
}: {
  item: Item
  search: Ref<StringOrNumber>
}) => ({ filter, value }: HeaderValueAndFilter): boolean => {
  const _value = item[value]
  if (typeof filter === 'function') {
    return filter(_value, toStringOrNumber(search.value, 'string'))
  }
  if (typeof _value === 'string') {
    return hasStringLetter(_value, search.value)
  } else if (typeof _value === 'number') {
    return hasNumberLetter(_value, search.value)
  } else if (_value instanceof Date) {
    return hasDateLetter(_value, search.value)
  } else return true
}

const filterItem = ({
  filterableHeaderValues,
  search
}: {
  filterableHeaderValues: ComputedRef<HeaderValueAndFilter[]>
  search: Ref<StringOrNumber>
}) => (item: Item): boolean =>
  filterableHeaderValues.value.some(
    someCheck({
      item,
      search
    })
  )

const getFilteredItems = ({
  filterableHeaderValues,
  search,
  items
}: GetFilteredItems): Item[] => {
  if (!search.value || !filterableHeaderValues.value.length) return items.value
  return items.value.filter(filterItem({ filterableHeaderValues, search }))
}

const useFilter = ({
  items,
  headers
}: FilterOptions): {
  items: ComputedRef<Item[]>
  filter: (search: string | number) => void
} => {
  const _search = ref<string | number>('')
  const filterableHeaderValues = computed<Pick<Header, 'value' | 'filter'>[]>(
    () => getFilterableHeaderValues(headers)
  )

  const filter = (search: string | number): void => {
    const lowerCaseSearch =
      typeof search === 'string' ? lowerCase(search) : search
    _search.value = lowerCaseSearch
  }

  const filteredItems = computed<Item[]>(() =>
    getFilteredItems({
      filterableHeaderValues,
      search: _search,
      items
    })
  )

  return {
    items: filteredItems,
    filter
  }
}

export {
  filterUndefinedOrTrue,
  getFilterableHeaderValues,
  hasDateLetter,
  hasNumberLetter,
  hasStringLetter,
  HeaderValueAndFilter,
  mapValueFilter,
  someCheck,
  useFilter
}
