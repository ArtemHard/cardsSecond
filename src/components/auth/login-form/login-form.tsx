import { PATH } from '../../../routes'
import Button from '../../ui/button/button'
import { Card } from '../../ui/card'
import { ControlledCheckbox } from '../../ui/controlled/controlled-checkbox'
import { ControlledInput } from '../../ui/controlled/controlled-input'
import { Input } from '../../ui/Input'
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
    register,
    formState: { errors },
  } = useLoginForm({ onSubmit })

  return (
    <Card className={style.card}>
      <Typography as="h1" variant="h1" className={style.title}>
        Sign In
      </Typography>
      <form onSubmit={handleSubmit}>
        <Input
          {...register('email')}
          errorMessage={errors.email?.message}
          type="email"
          label={'email'}
          className={style.textField}
        />
        {/* <Input
          {...register('password')}
          label={'password'}
          type="password"
          errorMessage={errors.password?.message}
          className={style.textField}
        /> */}
        <ControlledInput control={control} name="password" type="password" label={'password'} />
        <ControlledCheckbox
          control={control}
          name="rememberMe"
          label={'remember me'}
          position="left"
          defaultValue={false}
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
