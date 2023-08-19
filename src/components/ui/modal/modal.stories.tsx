import { Meta, StoryObj } from '@storybook/react'

import Button from '../button/button'

import { Modal, ModalFooter } from '.'

const meta = {
  title: 'Components/Modal',
  component: Modal,
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    open: true,
    title: 'Edit photo',
  },
}

export const FooterButton = {
  render: () => {
    return (
      <ModalFooter>
        <Button variant={'primary'}>Button primary</Button>
        <Button variant={'secondary'}>Button secondary</Button>
      </ModalFooter>
    )
  },
}
