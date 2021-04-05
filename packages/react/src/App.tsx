import React, { FC, ChangeEvent, useState } from 'react'
import DataTable from './components/DataTable'
import type { Item, Header } from '@miyauci/data-table-core'

const App: FC = () => {
  const headers: Header[] = [
    {
      text: 'Name',
      value: 'hoge'
    }
  ]
  const items: Item[] = [
    {
      hoge: 'huga'
    }
  ]

  const [search, setSearch] = useState('')

  const handleChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>): void => {
    setSearch(value)
  }

  return (
    <div className="App">
      <input onChange={handleChange} value={search} />
      <DataTable headers={headers} items={items} search={search} />
    </div>
  )
}

export default App
