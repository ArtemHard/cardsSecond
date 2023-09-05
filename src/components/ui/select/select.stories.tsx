import type { Meta, StoryObj } from '@storybook/react'

import { SelectRoot } from './select.tsx'

const meta = {
  title: 'Components/Select',
  component: SelectRoot,
  tags: ['autodocs'],
  // argTypes: {
  //   // disabled: ['true', 'false'],
  //   // value: ['HTML', 'SCC', 'React'],
  // },
} satisfies Meta<typeof SelectRoot>

export default meta
type Story = StoryObj<typeof meta>

const options = ['HTML', 'SCSS', 'React']
const placeholder = 'select variants'

export const Select: Story = {
  args: {
    options,
    placeholder: placeholder,
    defaultValue: options[0],
  },
}

export const SelectDisabled: Story = {
  args: {
    disabled: true,
    options,
    placeholder: placeholder,
    defaultValue: options[0],
  },
}
