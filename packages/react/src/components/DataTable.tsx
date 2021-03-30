import React, { FC } from 'react'
import type { Header, Item } from '@miyauci/data-table-core'

const DataTable: FC<{
  headers: Header[]
  items: Item[]
}> = ({ headers, items }) => (
  <table>
    <thead>
      <tr>
        {headers.map(({ text, value }) => (
          <th key={value}>{text}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {items.map((item, index) => (
        <tr key={index}>
          {headers.map(({ value }) => (
            <td key={value}>{item[value]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)

DataTable.defaultProps!.headers = []
DataTable.defaultProps!.items = []

export default DataTable
