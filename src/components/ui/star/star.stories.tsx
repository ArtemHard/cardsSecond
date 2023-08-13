import { DevTool } from '@hookform/devtools'
import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'

import Button from '../button/button'
import { ControlledRadio } from '../controlled/controlled-radio'

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
