import type { Meta, StoryObj } from '@storybook/react'

import { PersonalInfo } from '.'

const meta = {
  title: 'Auth/PersonalInfo',
  component: PersonalInfo,
  tags: ['autodocs'],
} satisfies Meta<typeof PersonalInfo>

export default meta
type Story = StoryObj<typeof meta>

export const EmptyAvatar: Story = {
  args: {
    name: 'Rassel Crow',
    email: 'bonjorno@gmail.com',
  },
}
export const NormalAvatar: Story = {
  args: {
    name: 'Rassel Crow',
    email: 'bonjorno@gmail.com',
    avatarSrc: 'https://avatars.githubusercontent.com/u/95387501?v=4',
  },
}
export const BrokenAvatar: Story = {
  args: {
    name: 'Rassel Crow',
    email: 'bonjorno@gmail.com',
    avatarSrc: 'https://avat.com/agsdfgsdfghshjgksdjfg',
  },
}
