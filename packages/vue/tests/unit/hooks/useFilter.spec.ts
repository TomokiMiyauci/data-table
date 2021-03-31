import type { Header, Item } from '@miyauci/data-table-core'
import { ref } from 'vue'

import {
  filterUndefinedOrTrue,
  getFilterableHeaderValues,
  hasDateLetter,
  hasNumberLetter,
  hasStringLetter,
  HeaderValueAndFilter,
  mapValueFilter,
  someCheck,
  StringOrNumber,
  useFilter
} from '@/hooks/useFilter'

describe('filterUndefinedOrTrue', () => {
  const value = ''
  const table: [Header, boolean][] = [
    [{ value }, true],
    [{ value: 'test' }, true],
    [{ value, filterable: true }, true],
    [{ value, filterable: false }, false]
  ]
  it.each(table)('filterUndefinedOrTrue(%s) -> %s', (header, expected) => {
    expect(filterUndefinedOrTrue(header)).toBe(expected)
  })
})

describe('mapValueFilter', () => {
  const value = ''
  const filter = undefined
  const headerValueAndFilter: HeaderValueAndFilter = { value, filter }
  const filterFn = () => true
  const text = 'text'
  const table: [Header, HeaderValueAndFilter][] = [
    [{ value }, headerValueAndFilter],
    [{ value, text }, headerValueAndFilter],
    [{ value, text, class: 'btn' }, headerValueAndFilter],
    [
      { value, text, class: 'btn', filter: filterFn },
      { value, filter: filterFn }
    ]
  ]
  it.each(table)('mapValueFilter(%s) -> %s', (header, expected) => {
    const result = mapValueFilter(header)
    expect(result).toEqual(expected)
    expect('value' in result).toBeTruthy()
    expect('filter' in result).toBeTruthy()
    expect(Object.keys(result).length).toBe(2)
  })
})

describe('getFilterableHeaderValues', () => {
  const value = ''
  const filter = undefined
  const headerValueAndFilter: HeaderValueAndFilter = { value, filter }
  const filterFn = () => true
  const text = 'text'
  const table: [Header[], HeaderValueAndFilter[]][] = [
    [[{ value }], [headerValueAndFilter]],
    [
      [{ value }, { value }],
      [headerValueAndFilter, headerValueAndFilter]
    ],
    [[{ value, text }], [headerValueAndFilter]],
    [[{ value, text, class: 'btn' }], [headerValueAndFilter]],
    [
      [
        { value, text, class: 'btn', filter: filterFn },
        { value, text, class: 'btn1', filter: filterFn }
      ],
      [
        { value, filter: filterFn },
        { value, filter: filterFn }
      ]
    ]
  ]
  it.each(table)('getFilterableHeaderValues(%j) -> %j', (header, expected) => {
    expect(getFilterableHeaderValues(ref(header))).toEqual(expected)
  })
})

describe('hasStringLetter', () => {
  const table: [string, StringOrNumber, boolean][] = [
    ['test', 'something', false],
    ['test', 'TEST', false],
    ['abc', 'abd', false],
    ['abc', 'ac', false],
    ['test', 1, false],
    ['TEST', 'TESTT', false],
    ['TEST', 'test', false],
    ['tEst', 'e', false],
    ['TesT', 't', false],
    ['', '', true],
    ['test', '', true],
    ['test', 't', true],
    ['test', 'es', true],
    ['TEST', 'TEST', true],
    ['TEST', 'TES', true],
    ['Test', 't', true]
  ]
  it.each(table)('hasStringLetter(%s, %s) -> %s', (val, search, expected) => {
    expect(hasStringLetter(val, search)).toBe(expected)
  })
})

describe('hasNumberLetter', () => {
  const table: [number, StringOrNumber, boolean][] = [
    [0, 'TEST', false],
    [-1, 'test', false],
    [0, 'test', false],
    [1, 'test', false],
    [11, 1, false],
    [123, 124, false],
    [10, 20, false],
    [123, '', true],
    [0, '', true],
    [123, 123, true],
    [1, 1, true],
    [0, 0, true],
    [-1, -1, true],
    [Infinity, Infinity, true],
    [Infinity, 0, false]
  ]
  it.each(table)('hasStringLetter(%d, %s) -> %s', (val, search, expected) => {
    expect(hasNumberLetter(val, search)).toBe(expected)
  })
})

describe('hasDateLetter', () => {
  const date = new Date('2000/1/1')
  const table: [Date, StringOrNumber, boolean][] = [
    [date, 1999, false],
    // [date, '1/2', false],
    [date, '0000', false],
    [date, 999, false],
    [date, '2000/1/1 00:00:00', false],
    [date, '2000/1/100:00:00', false],
    [date, '2000/1/1 00:00:01', false],
    [date, '', true],
    [date, 0, true],
    [date, '2', true],
    [date, '2000', true]
    // [date, '2000/1/1', true],
    // [date, '2000/1/1 0:00:00', true],
    // [date, '0:00:00', true],
    // [date, '/1/1', true]
  ]

  it.each(table)('hasStringLetter(%s, %s) -> %s', (val, search, expected) => {
    expect(hasDateLetter(val, search)).toBe(expected)
  })
})

describe('someCheck', () => {
  const date = new Date('2000/1/1')
  const table: [Item, StringOrNumber, HeaderValueAndFilter, boolean][] = [
    [{}, '', { value: '' }, true],
    [{ h: '' }, 't', { value: '' }, true],
    [{ h: '' }, 't', { value: 'h' }, false],
    [{ h: 't' }, 't', { value: 'h' }, true],
    [{ h: 't' }, 'tt', { value: 'h' }, false],
    [{ h: 't' }, 'T', { value: 'h' }, false],
    [{ h: 'TEST' }, 0, { value: 'h' }, false],
    [{ n: 10 }, 20, { value: 'n' }, false],
    [{}, 0, { value: '' }, true],
    [{}, 1, { value: '' }, true],
    [{ n: '' }, 1, { value: 'n' }, false],
    [{ n: '' }, 0, { value: 'n' }, false],
    [{ n: '' }, -1, { value: 'n' }, false],
    [{ n: 0 }, 0, { value: 'n' }, true],
    [{ n: -1 }, -1, { value: 'n' }, true],
    [{ n: Infinity }, Infinity, { value: 'n' }, true],
    [{ d: date }, '', { value: '' }, true],
    [{ d: date }, '', { value: 'd' }, true],
    [{ d: date }, '20', { value: 'd' }, true],
    [{ d: date }, '1/1', { value: 'd' }, true],
    [{ d: date }, 2000, { value: 'd' }, true]
  ]
  it.each(table)(
    'someCheck(%j, %s)(%j) -> %s',
    (item, search, headerValueAndFilter, expected) => {
      expect(
        someCheck({
          item,
          search: ref(search)
        })(headerValueAndFilter)
      ).toEqual(expected)
    }
  )
})
