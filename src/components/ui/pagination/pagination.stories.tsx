import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Pagination } from '.'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    count: 100,
    page: 10,
    onChange: (page: number) => console.log(page),
    siblings: 1,
  },
}
export const InComponent = {
  render: () => {
    const [page, setPage] = useState(1)

    return (
      <Pagination count={100} onChange={(page: number) => setPage(page)} page={page} siblings={1} />
    )
  },
}
