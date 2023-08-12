import { Meta, StoryObj } from '@storybook/react'

import { SwitchButton, TabSwither } from '.'

const meta = {
  title: 'Components/TabSwither',
  component: TabSwither,
  tags: ['autodocs'],
} satisfies Meta<typeof TabSwither>

export default meta
type Story = StoryObj<typeof meta>

const buttons: SwitchButton[] = [
  { label: 'All cards', value: 'all' },
  { label: 'My cards', value: 'my' },
  { label: 'Switcher', value: 'Switcher1' },
  { label: 'Switcher', value: 'Switcher2' },
  { label: 'Switcher', value: 'Switcher3' },
]

export const Default: Story = {
  args: {
    buttons,
    defaultValue: 'Switcher3',
    onValueChange: (value: string) => console.log('action depend from ' + value),
  },
}
export const Disabled: Story = {
  args: {
    disabled: true,
    buttons,
    defaultValue: 'Switcher3',
    onValueChange: (value: string) => console.log('action depend from ' + value),
  },
}
