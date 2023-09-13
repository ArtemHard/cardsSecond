import { Link } from 'react-router-dom'

import { CheckEmailSvg } from '../../../assets/icons/CheckEmailSvg'
import { PATH } from '../../../routes'
import Button from '../../ui/button/button'
import { Card } from '../../ui/card'
import { Typography } from '../../ui/Typography'

import style from './check-email.module.scss'

type CheckEmailProps = {
  email: string
}

export const CheckEmail = ({ email }: CheckEmailProps) => {
  return (
    <Card className={style.card}>
      <Typography as="h1" variant="h1" className={style.title}>
        Check Email
      </Typography>
      <div className={style.svgContainer}>
        <CheckEmailSvg />
      </div>
      <Typography variant="body2" className={style.text}>
        We’ve sent an Email with instructions to {email}
      </Typography>
      <Button as={Link} to={PATH.LOGIN} fullWidth className={style.button}>
        Back to Sign In
      </Button>
    </Card>
  )
}
