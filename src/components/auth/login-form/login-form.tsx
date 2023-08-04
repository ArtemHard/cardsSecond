import { useController, useForm } from 'react-hook-form'

import { PATH } from '../../../routes'
import Button from '../../ui/button/button'
import { Card } from '../../ui/card'
import { Checkbox } from '../../ui/Checkbox'
import { Input } from '../../ui/Input'
import { Typography } from '../../ui/Typography'

import style from './login-form.module.scss'
import { useLoginForm } from './use-login-form'

export const LoginForm = ({ onSubmit }: any) => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useLoginForm(onSubmit)

  const {
    field: { value, onChange },
  } = useController({
    name: 'rememberMe',
    control,
    defaultValue: false,
  })

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
        <Input
          {...register('password')}
          label={'password'}
          type="password"
          errorMessage={errors.password?.message}
          className={style.textField}
        />
        <Checkbox
          className={style.checkbox}
          checked={value}
          onValueChange={onChange}
          label={'remember me'}
          position="left"
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
