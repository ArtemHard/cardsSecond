import { Link, useNavigate } from 'react-router-dom'

import { LogoutSvg } from '../../../assets/icons'
import { BrandSvg } from '../../../assets/icons/BrandSvg'
import { PersonOutlineSvg } from '../../../assets/icons/PersonOutlineSvg'
import { PATH } from '../../../routes'
import { Avatar } from '../../ui/avatar'
import Button from '../../ui/button/button'
import { DropDownMenu, DropDownMenuIcon } from '../../ui/drop-down-menu'
import { Typography } from '../../ui/Typography'

import style from './header.module.scss'

export type HeaderProps = {
  signOutClick: () => void
  isAuth: boolean
  userInfo?: {
    name: string
    email: string
    avatarSrc?: string
  }
}
export const Header = ({ isAuth, userInfo, signOutClick }: HeaderProps) => {
  const navigate = useNavigate()
  const dropdownItems = (name: string, email: string, avatarSrc?: string) => {
    return (
      <>
        <DropDownMenuIcon
          icon={<Avatar name={name} src={avatarSrc} />}
          style={{ cursor: 'default' }}
          className={style.dropDownProfile}
          disabled={true}
        >
          <div className={style.dropDownProfileText}>
            <Typography variant="subtitle2" as="span" style={{ margin: 0 }}>
              {name}
            </Typography>
            <Typography variant="caption" as="span" className={style.emailDropDown}>
              {email}
            </Typography>
          </div>{' '}
        </DropDownMenuIcon>
        <DropDownMenuIcon icon={<PersonOutlineSvg />} onClick={() => navigate(PATH.PROFILE)}>
          <Typography variant="subtitle2" style={{ margin: 0 }}>
            My Profile
          </Typography>{' '}
        </DropDownMenuIcon>
        <DropDownMenuIcon icon={<LogoutSvg />} onClick={signOutClick}>
          <Typography variant="subtitle2" style={{ margin: 0 }}>
            Sign Out
          </Typography>{' '}
        </DropDownMenuIcon>
      </>
    )
  }

  return (
    <header className={style.header}>
      <BrandSvg />
      {isAuth && userInfo && (
        <div className={style.userContainer}>
          <Typography className={style.userNameText} as={Link} to={PATH.PROFILE}>
            {userInfo.name}
          </Typography>
          <DropDownMenu trigger={<Avatar name={userInfo.name} src={userInfo?.avatarSrc} />}>
            {dropdownItems(userInfo.name, userInfo.email, userInfo.avatarSrc)}
          </DropDownMenu>
        </div>
      )}
      {!isAuth && (
        <Button variant="primary" as={Link} to={PATH.LOGIN}>
          Sign In
        </Button>
      )}
    </header>
  )
}
