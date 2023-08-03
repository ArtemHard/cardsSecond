import { PATH } from '../../../routes'
import { Button } from '../../ui/button'
import { Card } from '../../ui/card'
import { Input } from '../../ui/Input'
import { Typography } from '../../ui/Typography'

import { ForgotPasswordFormProps, useForgotPasswordForm } from './forgot-password-form'
import style from './forgot-password-form.module.scss'

export const ForgotPasswordForm = (onSubmit: ForgotPasswordFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForgotPasswordForm(onSubmit)

  return (
    <Card className={style.card}>
      <Typography as="h1" variant="h1" className={style.title}>
        Forgot your password?
      </Typography>
      <form onSubmit={handleSubmit}>
        <Input
          {...register('email')}
          errorMessage={errors.email?.message}
          type="text"
          label={'Email'}
          className={style.textField}
        />
        <Typography variant="body2" className={style.text}>
          Enter your email address and we will send you further instructions
        </Typography>
        <Button type="submit" fullWidth className={style.button}>
          Send Instructions
        </Button>
      </form>
      <Typography variant="body2" className={style.dontHaveAccount}>
        {'Did you remember your password?'}
      </Typography>
      <Typography as={'a'} href={PATH.REGISTRATION} className={style.signUpLink}>
        Try logging in
      </Typography>
    </Card>
  )
}
