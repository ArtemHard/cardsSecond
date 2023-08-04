import { useController, useForm } from 'react-hook-form'

import { PATH } from '../../../routes'
import Button from '../../ui/button/button'
import { Card } from '../../ui/card'
import { Checkbox } from '../../ui/Checkbox'
import { Input } from '../../ui/Input'
import { Typography } from '../../ui/Typography'

import { useSignUpForm } from './sign-up-form'
import style from './sign-up-form.module.scss'

export const SignUpForm = ({ onSubmit }: any) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useSignUpForm(onSubmit)

  return (
    <Card className={style.card}>
      <Typography as="h1" variant="h1" className={style.title}>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <Input
          {...register('email')}
          errorMessage={errors.email?.message}
          type="email"
          label={'Email'}
          className={style.textField}
        />
        <Input
          {...register('password')}
          label={'Password'}
          type="password"
          errorMessage={errors.password?.message}
          className={style.textField}
        />
        <Input
          {...register('confirmPassword')}
          label={'Confirm Password'}
          type="password"
          errorMessage={errors.confirmPassword?.message}
          className={style.textField}
        />

        {/* <Typography
          variant="body2"
          as="a"
          href={PATH.FORGOT_PASSWORD}
          className={style.forgotPassword}
        >
          Forgot Password?
        </Typography> */}
        <Button type="submit" fullWidth>
          Sign Up
        </Button>
      </form>
      <Typography variant="body2" className={style.dontHaveAccount}>
        {'Already have an account?'}
      </Typography>
      <Typography as={'a'} href={PATH.LOGIN} className={style.signUpLink}>
        Sign In
      </Typography>
    </Card>
  )
}
