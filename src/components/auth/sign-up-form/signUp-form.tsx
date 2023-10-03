import { Link } from 'react-router-dom'

import { PATH } from '../../../routes'
import Button from '../../ui/button/button'
import { Card } from '../../ui/card'
import { Input } from '../../ui/Input'
import { Typography } from '../../ui/Typography'

import { FormValuesSignUp, useSignUpForm } from './sign-up-form'
import style from './sign-up-form.module.scss'

type SignUpFormPropsType = {
  onSubmit: (data: FormValuesSignUp) => void
  isSubmitting?: boolean
}

export const SignUpForm = ({ onSubmit, isSubmitting }: SignUpFormPropsType) => {
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
          type="text"
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
        <Button type="submit" fullWidth disabled={isSubmitting}>
          Sign Up
        </Button>
      </form>
      <Typography variant="body2" className={style.dontHaveAccount}>
        {'Already have an account?'}
      </Typography>
      <Typography as={Link} to={PATH.LOGIN} className={style.signUpLink}>
        Sign In
      </Typography>
    </Card>
  )
}
