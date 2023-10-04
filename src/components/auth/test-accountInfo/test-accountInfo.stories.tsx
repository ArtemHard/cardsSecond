import type { Meta, StoryObj } from '@storybook/react'

import { TestAccountInfo } from './test-accountInfo'

const meta = {
  title: 'Components/TestAccountInfo',
  component: TestAccountInfo,
  tags: ['autodocs'],
} satisfies Meta<typeof TestAccountInfo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
