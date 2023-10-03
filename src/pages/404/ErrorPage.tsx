import { Link, useNavigate } from 'react-router-dom'

import { ErrorPageSvg } from '../../assets/icons/404Svg'
import Button from '../../components/ui/button/button'
import { Typography } from '../../components/ui/Typography'

import style from './errorPage.module.scss'

export const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <div className={style.root}>
      <ErrorPageSvg />
      <Typography variant="body1">Sorry! Page not found!</Typography>
      <Button as={Link} onClick={navigate(-1)}>
        Back to home page
      </Button>
    </div>
  )
}
