import { useController, useForm } from 'react-hook-form'

import { PATH } from '../../../routes'
import { Button } from '../../ui/button'
import { Card } from '../../ui/card'
import { Checkbox } from '../../ui/Checkbox'
import { Input } from '../../ui/Input'
import { Typography } from '../../ui/Typography'

import { useSignUpForm } from './sign-up-form'
import style from './sign-up-form.module.scss'

export const SignUpForm = ({ onSubmit }: any) => {
  const {
    handleSubmit,
    control,
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
          label={'email'}
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
          Submit
        </Button>
      </form>
      {/* <Typography variant="body2" className={style.dontHaveAccount}>
        {"Don't have an account?"}
      </Typography>
      <Typography as={'a'} href={PATH.REGISTRATION} className={style.signUpLink}>
        Sign Up
      </Typography> */}
    </Card>
  )
}
