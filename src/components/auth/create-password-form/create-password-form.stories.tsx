import type { Meta, StoryObj } from '@storybook/react'

import { CreatePasswordForm } from '.'

const meta = {
  title: 'Auth/CreatePasswordForm',
  component: CreatePasswordForm,
  tags: ['autodocs'],
} satisfies Meta<typeof CreatePasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
