import type { Meta } from '@storybook/react'

import { LogoutSvg } from '../../../assets/icons'
import { PersonOutlineSvg } from '../../../assets/icons/PersonOutlineSvg'
import { Avatar } from '../avatar'
import Button from '../button/button'
import { Typography } from '../Typography'

import { DropDownMenu, DropDownMenuIcon } from './drop-down-menu'

const meta = {
  title: 'Components/DropDownMenu',
  component: DropDownMenu,
  tags: ['autodocs'],
} satisfies Meta<typeof DropDownMenu>

export default meta

export const Variants = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <DropDownMenu trigger={<Button>clik 1111111111111111</Button>}>
          <DropDownMenuIcon onSelect={() => {}}>
            <div
              style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', alignItems: 'center' }}
            >
              <Avatar name="Ivan" />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography variant="subtitle2" as="span">
                  Ivan
                </Typography>
                <Typography variant="caption" as="span">
                  j&johnson@gmail.com
                </Typography>
              </div>
            </div>
          </DropDownMenuIcon>
          <DropDownMenuIcon onSelect={() => {}} icon={<PersonOutlineSvg />}>
            My Profile
          </DropDownMenuIcon>
          <DropDownMenuIcon icon={<LogoutSvg />}>Sign Out</DropDownMenuIcon>
        </DropDownMenu>
        <DropDownMenu trigger={<Avatar name="Ivan" />}>
          <DropDownMenuIcon onSelect={() => {}}>
            <div
              style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', alignItems: 'center' }}
            >
              <Avatar name="Ivan" />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography variant="subtitle2" as="span">
                  Ivan
                </Typography>
                <Typography variant="caption" as="span">
                  j&johnson@gmail.com
                </Typography>
              </div>
            </div>
          </DropDownMenuIcon>
          <DropDownMenuIcon onSelect={() => {}} icon={<PersonOutlineSvg />}>
            My Profile
          </DropDownMenuIcon>
          <DropDownMenuIcon icon={<LogoutSvg />}>Sign Out</DropDownMenuIcon>
        </DropDownMenu>
      </div>
    )
  },
}
