interface Header {
  text?: string
  class?: string
  value: string | number
  filterable?: boolean
  filter?: (val: unknown, lowerCaseSearch: string) => boolean
  sortable?: boolean
}

interface Item {
  class?: string
  [k: string]: string | number | Date | undefined
}

type Order = 'ASC' | 'DESC'
type StringOrNumber = string | number
export type { Header, Item, Order, StringOrNumber }
