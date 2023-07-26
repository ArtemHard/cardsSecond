import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './Input'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const InputDefault: Story = {
  args: {
    label: 'Label',
    placeholder: 'write here',
    type: 'text',
  },
}
export const InputPassword: Story = {
  args: {
    label: 'Label',
    placeholder: 'write here',
    type: 'password',
  },
}
export const InputError: Story = {
  args: {
    errorMessage: 'error message',
    label: 'Label',
    placeholder: 'write here',
    type: 'text',
  },
}
