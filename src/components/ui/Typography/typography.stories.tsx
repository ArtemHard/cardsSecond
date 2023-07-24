import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from './Typography'

const meta = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: [
        'large',
        'h1',
        'h2',
        'h3',
        'body1',
        'body2',
        'subtitle1',
        'subtitle2',
        'caption',
        'overline',
        'link1',
        'link2',
        'error',
      ],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
  args: {
    children: 'Lorem ipsum.',
    variant: 'large',
  },
}
export const H1: Story = {
  args: {
    children: 'Lorem ipsum.',
    variant: 'h1',
  },
}
export const H2: Story = {
  args: {
    children: 'Lorem ipsum.',
    variant: 'h2',
  },
}
export const H3: Story = {
  args: {
    children: 'Lorem ipsum.',
    variant: 'h3',
  },
}
export const Body1: Story = {
  args: {
    children: 'Lorem ipsum.',
    variant: 'body1',
  },
}
export const Body2: Story = {
  args: {
    children: 'Lorem ipsum.',
    variant: 'body2',
  },
}
export const Subtitle1: Story = {
  args: {
    children: 'Lorem ipsum.',
    variant: 'subtitle1',
  },
}
export const Subtitle2: Story = {
  args: {
    children: 'Lorem ipsum.',
    variant: 'subtitle2',
  },
}
export const Caption: Story = {
  args: {
    children: 'Lorem ipsum.',
    variant: 'caption',
  },
}
export const Overline: Story = {
  args: {
    children: 'Lorem ipsum.',
    variant: 'overline',
  },
}
export const Link1: Story = {
  args: {
    children: 'Lorem ipsum.',
    variant: 'link1',
  },
}
export const Link2: Story = {
  args: {
    children: 'Lorem ipsum.',
    variant: 'link2',
  },
}
export const Error: Story = {
  args: {
    children: 'Lorem ipsum.',
    variant: 'error',
  },
}
