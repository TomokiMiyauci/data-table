import React, { FC, useEffect } from 'react'
import type { Header, Item } from '@miyauci/data-table-core'
import { useFilter } from '../hooks'

const DataTable: FC<{
  headers: Header[]
  items: Item[]
  search?: string
}> = ({ headers, items, search }) => {
  const { filter, items: filteredItems } = useFilter({ items, headers })

  useEffect(() => {
    filter(search || '')
  }, [search])

  return (
    <table>
      <thead>
        <tr>
          {headers.map(({ text, value }) => (
            <th key={value}>{text}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredItems.map((item, index) => (
          <tr key={index}>
            {headers.map(({ value }) => (
              <td key={value}>{item[value]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

if (DataTable.defaultProps) {
  DataTable.defaultProps.headers = []
  DataTable.defaultProps.items = []
}

export default DataTable
