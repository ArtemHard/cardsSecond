import type { Meta, StoryObj } from '@storybook/react'

import { SelectRoot } from './select.tsx'

const meta = {
  title: 'Components/Select',
  component: SelectRoot,
  tags: ['autodocs'],
  argTypes: {
    disabled: ['true', 'false'],
    value: ['HTML', 'SCC', 'React'],
  },
} satisfies Meta<typeof SelectRoot>

export default meta
type Story = StoryObj<typeof meta>

export const Select: Story = {
  args: {
    disabled: false,
    value: ['HTML', 'SCSS', 'React'],
  },
}

export const SelectDisabled: Story = {
  args: {
    disabled: true,
    value: ['HTML', 'SCC', 'React'],
  },
}
