import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { TableHeader } from './TableHeader'

export type Sort = {
  key: string
  direction: 'asc' | 'desc'
} | null

export type Column = {
  key: string
  title: string
  isSortable?: boolean
}

export const HeaderStory = {
  render: () => {
    const [sort, setSort] = useState<Sort>(null)

    const columns: Column[] = [
      {
        key: 'name',
        title: 'Name',
        isSortable: true,
      },
      {
        key: 'cardsCount',
        title: 'Cards',
        isSortable: true,
      },
      {
        key: 'updated',
        title: 'Last Updated',
        isSortable: true,
      },
      {
        key: 'createdBy',
        title: 'Created by',
        isSortable: true,
      },
      { key: 'options', title: '', isSortable: false },
    ]

    // const sortString = sort ? `${sort.key}-${sort.direction}` : null

    // console.log(sort)

    return (
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <TableHeader columns={columns} onSort={setSort} sort={sort} />
      </table>
    )
  },
}

const meta = {
  title: 'Components/TableHeader',
  component: TableHeader,
  tags: ['autodocs'],
} satisfies Meta<typeof TableHeader>

export default meta
// type Story = StoryObj<typeof meta>
