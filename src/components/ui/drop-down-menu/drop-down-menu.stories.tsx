import type { Meta, StoryObj } from '@storybook/react'

import { EditPenSvg } from '../../../assets/icons'
import { Avatar } from '../avatar'
import Button from '../button/button'

import { DropDownMenu, DropDownMenuIcon } from './drop-down-menu'

const meta = {
  title: 'Components/DropDownMenu',
  component: DropDownMenu,
  tags: ['autodocs'],
} satisfies Meta<typeof DropDownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    trigger: <Avatar name="Artem" />,
    children: (
      <>
        <DropDownMenuIcon onSelect={() => {}} icon={<EditPenSvg />}>
          123
        </DropDownMenuIcon>
        <DropDownMenuIcon>123</DropDownMenuIcon>
      </>
    ),
  },
}

export const InComponent = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <DropDownMenu trigger={<Button>clik 1111111111111111</Button>}>
          <DropDownMenuIcon onSelect={() => {}} icon={<EditPenSvg />}>
            123
          </DropDownMenuIcon>
          <DropDownMenuIcon>123</DropDownMenuIcon>
        </DropDownMenu>
        <DropDownMenu trigger={<Avatar name="Ghorj" />}>
          <DropDownMenuIcon onSelect={() => {}} icon={<EditPenSvg />}>
            123
          </DropDownMenuIcon>
          <DropDownMenuIcon>123</DropDownMenuIcon>
        </DropDownMenu>
      </div>
    )
  },
}
