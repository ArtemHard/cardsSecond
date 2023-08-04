import { BrandSvg } from '../../../assets/icons/BrandSvg'
import { Avatar } from '../../ui/avatar'
import Button from '../../ui/button/button'
import { Typography } from '../../ui/Typography'

import style from './header.module.scss'

type HeaderProps = {
  signOutClick: () => void
  isAuth: boolean
  userInfo: {
    name: string
    avatarSrc: string
  }
}
export const Header = ({ isAuth, userInfo, signOutClick }: HeaderProps) => {
  return (
    <header className={style.header}>
      <BrandSvg />
      {isAuth && (
        <div className={style.userContainer}>
          <Typography className={style.userNameText}>{userInfo.name}</Typography>
          <Avatar name={userInfo.name} src={userInfo.avatarSrc} />
        </div>
      )}
      {!isAuth && (
        <Button variant="primary" onClick={signOutClick}>
          Sign In
        </Button>
      )}
    </header>
  )
}
