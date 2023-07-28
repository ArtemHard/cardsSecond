import type { Meta, StoryObj } from '@storybook/react'

import { Avatar } from './avatar'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const NormalAvatar: Story = {
  args: {
    name: 'Artem',
    src: 'https://avatars.githubusercontent.com/u/95387501?v=4',
  },
}

export const EmptyAvatar: Story = {
  args: {
    name: 'Artem',
  },
}
export const BrokenAvatar: Story = {
  args: {
    name: 'Artem',
    src: 'https://avat.com/agsdfgsdfghshjgksdjfg',
  },
}
