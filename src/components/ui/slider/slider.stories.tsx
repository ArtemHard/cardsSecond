import { useState } from 'react'

import { Meta } from '@storybook/react'

import { Slider } from '.'

const meta = {
  title: 'Components/Slider',
  component: Slider,
} satisfies Meta<typeof Slider>

export default meta

export const InComponent = {
  render: () => {
    const [value, setValue] = useState<number[]>([0, 75])
    const max = 75
    const min = 0

    const onValueCommit = (values: number[]) => {
      alert('установленно значние ' + values)
    }

    return (
      <Slider
        onValueChange={setValue}
        min={min}
        max={max}
        value={value}
        onValueCommit={onValueCommit}
      />
    )
  },
}
