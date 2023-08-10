import { DevTool } from '@hookform/devtools'

import { PATH } from '../../../routes'
import Button from '../../ui/button/button'
import { Card } from '../../ui/card'
import { ControlledCheckbox } from '../../ui/controlled/controlled-checkbox'
import { ControlledInput } from '../../ui/controlled/controlled-input'
import { Typography } from '../../ui/Typography'

import style from './login-form.module.scss'
import { FormValuesLogin, useLoginForm } from './use-login-form'

export type LoginFormProps = {
  onSubmit: (data: FormValuesLogin) => void
}
export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useLoginForm({ onSubmit })

  return (
    <Card className={style.card}>
      <Typography as="h1" variant="h1" className={style.title}>
        Sign In
      </Typography>
      <form onSubmit={handleSubmit}>
        <DevTool control={control} />
        <ControlledInput
          control={control}
          name="email"
          type="email"
          label={'Email'}
          className={style.textField}
          errorMessage={errors.password?.message}
        />
        <ControlledInput
          control={control}
          name="password"
          type="password"
          label={'Password'}
          className={style.textField}
          errorMessage={errors.password?.message}
        />
        <ControlledInput
          control={control}
          name="password"
          type="password"
          label={'password'}
          className={style.textField}
        />
        <ControlledCheckbox
          control={control}
          name="rememberMe"
          label={'remember me'}
          position="left"
          defaultValue={false}
          className={style.checkbox}
        />
        <Typography
          variant="body2"
          as="a"
          href={PATH.FORGOT_PASSWORD}
          className={style.forgotPassword}
        >
          Forgot Password?
        </Typography>
        <Button type="submit" fullWidth>
          Submit
        </Button>
      </form>
      <Typography variant="body2" className={style.dontHaveAccount}>
        {"Don't have an account?"}
      </Typography>
      <Typography as={'a'} href={PATH.REGISTRATION} className={style.signUpLink}>
        Sign Up
      </Typography>
    </Card>
  )
}
