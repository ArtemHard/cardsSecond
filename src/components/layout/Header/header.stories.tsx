import type { Meta, StoryObj } from '@storybook/react'

import { Header } from './Header'

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const HeaderLogIn: Story = {
  args: {
    isAuth: true,
    userInfo: {
      name: 'Artem',
      avatarSrc: 'https://avatars.githubusercontent.com/u/95387501?v=4',
    },
    signOutClick: () => alert('callback SIGN OUT'),
  },
}
