import { Item, StringOrNumber } from '@miyauci/data-table-core'
import { Ord } from 'rambda'

import {
  _getState,
  getNextSortMap,
  getNextState,
  OrderState,
  simpleSort,
  sortFn,
  sortItems
} from '@/hooks/useSort'

describe('getNextState', () => {
  const table: [OrderState, OrderState][] = [
    ['', 'ASC'],
    ['ASC', 'DESC'],
    ['DESC', '']
  ]
  it.each(table)('getNextState(%s) -> %s', (type, expected) => {
    expect(getNextState(type)).toBe(expected)
  })
})

describe('sortFn', () => {
  const date = new Date('2000/1/1')
  const table: [StringOrNumber, Item, Ord][] = [
    ['', {}, ''],
    [
      '',
      {
        t: 'test'
      },
      ''
    ],
    [
      't',
      {
        t: 'Test'
      },
      'test'
    ],
    [0, {}, ''],
    [0, { 0: 'test' }, 'test'],
    [0, { 0: 1 }, 1],
    [1, { 0: date }, ''],
    [1, { 1: date }, date],
    [1, { 1: undefined }, '']
  ]
  it.each(table)('sortFn(%s)(%j) -> %s', (key, item, expected) => {
    expect(sortFn(key)(item)).toBe(expected)
  })
})

describe('_getState', () => {
  const table: [StringOrNumber, OrderState, StringOrNumber, OrderState][] = [
    ['', '', '', ''],
    ['', 'ASC', '', 'ASC'],
    ['', 'DESC', '', 'DESC'],
    ['k', 'DESC', '', ''],
    ['k', '', '', ''],
    ['k', '', 'k', ''],
    ['k', 'ASC', 'k', 'ASC'],
    ['k', 'ASC', 'kk', ''],
    [0, '', '', ''],
    [0, '', 0, ''],
    [1, '', 1, ''],
    [0, 'ASC', '', ''],
    [0, 'ASC', 0, 'ASC']
  ]
  it.each(table)(
    '_getState(%s,%s)($s) -> %s',
    (prevKey, type, key, expected) => {
      expect(_getState(prevKey, type)(key)).toBe(expected)
    }
  )
})

describe('simpleSort', () => {
  const item1: Item = { t: 't' }
  const item2: Item = { k: 'test' }
  const item3: Item = { l: 'l' }

  const table: [Item[], OrderState, Item[]][] = [
    [[item1, item2], '', [item1, item2]],
    [[item1, item2], 'ASC', [item1, item2]],
    [[item1, item2, item3], 'DESC', [item3, item2, item1]]
  ]
  it.each(table)('simpleSort(%j, %s) -> %j', (item, type, expected) => {
    expect(simpleSort(item, type)).toEqual(expected)
  })
})

describe('getNextSortMap', () => {
  const item1: Item = { t: 't' }
  const item2: Item = { k: 'test' }
  const item3: Item = { l: 'l' }

  const table: [
    StringOrNumber,
    StringOrNumber,
    OrderState,
    OrderState,
    OrderState,
    StringOrNumber
  ][] = [
    ['', '', '', '', 'ASC', ''],
    ['', '', '', 'ASC', 'DESC', ''],
    ['', '', '', 'DESC', '', ''],
    ['', '', 'ASC', 'DESC', 'ASC', ''],
    ['', '', 'ASC', '', 'ASC', ''],
    ['', '', 'DESC', '', 'DESC', ''],
    ['', '', 'DESC', 'ASC', 'DESC', ''],
    ['', 't', 'DESC', 'ASC', 'DESC', ''],
    ['t', '', 'DESC', 'ASC', 'DESC', 't'],
    ['t', 'l', 'DESC', 'ASC', 'DESC', 't'],
    ['k', 'l', 'DESC', 'ASC', 'DESC', 'k']
  ]
  it.each(table)(
    'getNextSortMap(%j, %s) -> %j',
    (key, prevKey, type, prevType, expectedType, expectedKey) => {
      expect(
        getNextSortMap({
          key,
          prevType,
          type,
          prevKey
        })
      ).toEqual({
        type: expectedType,
        key: expectedKey
      })
    }
  )
})

describe('sortItems', () => {
  const date1 = new Date('2000/1/1')
  const date2 = new Date('2020/3/4')
  const date3 = new Date('1999/12/31')
  const item1: Item = { t: 'a', l: 100, d: date2 }
  const item2: Item = { t: 'l', l: -1, d: date3 }
  const item3: Item = { t: 'z', l: 0, d: date1 }

  const table: [Item[], OrderState, StringOrNumber, Item[]][] = [
    [[], '', '', []],
    [[item1, item2], '', '', [item1, item2]],
    [[item1, item2], 'ASC', '', [item1, item2]],
    [[item1, item2], 'DESC', '', [item1, item2]],
    [[item1, item2, item3], '', 't', [item1, item2, item3]],
    [[item3, item2, item1], '', 't', [item3, item2, item1]],
    [[item2, item3, item1], '', 't', [item2, item3, item1]],
    [[item1, item2, item3], 'ASC', 't', [item1, item2, item3]],
    [[item3, item2, item1], 'ASC', 't', [item1, item2, item3]],
    [[item2, item3, item1], 'ASC', 't', [item1, item2, item3]],
    [[item1, item2, item3], 'DESC', 't', [item3, item2, item1]],
    [[item2, item3, item1], 'DESC', 't', [item3, item2, item1]],
    [[item1, item2, item3], 'ASC', 'l', [item2, item3, item1]],
    [[item3, item2, item1], 'ASC', 'l', [item2, item3, item1]],
    [[item2, item3, item1], 'ASC', 'l', [item2, item3, item1]],
    [[item2, item3, item1], 'DESC', 'l', [item1, item3, item2]],
    [[item1, item2, item3], '', 'd', [item1, item2, item3]],
    [[item3, item2, item1], '', 'd', [item3, item2, item1]],
    [[item2, item3, item1], '', 'd', [item2, item3, item1]],
    [[item1, item2, item3], 'ASC', 'd', [item2, item3, item1]],
    [[item3, item2, item1], 'ASC', 'd', [item2, item3, item1]],
    [[item2, item3, item1], 'ASC', 'd', [item2, item3, item1]],
    [[item1, item2, item3], 'DESC', 'd', [item1, item3, item2]],
    [[item3, item2, item1], 'DESC', 'd', [item1, item3, item2]],
    [[item2, item3, item1], 'DESC', 'd', [item1, item3, item2]]
  ]
  it.each(table)(
    'sortItems(%j, %s, %s) -> %j',
    (items, type, key, expected) => {
      expect(
        sortItems({
          items,
          type,
          key
        })
      ).toEqual(expected)
    }
  )
})
