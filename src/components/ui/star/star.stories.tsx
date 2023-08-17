import type { Meta, StoryObj } from '@storybook/react'

import { StarRating } from '.'

const meta = {
  title: 'icons/Star',
  component: StarRating,
  tags: ['autodocs'],
} satisfies Meta<typeof StarRating>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    rating: 0,
    setLengthRating: 5,
  },
}
