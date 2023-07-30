import { zodResolver } from '@hookform/resolvers/zod'
import { useController, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { PATH } from '../../../routes'
import { Button } from '../../ui/button'
import { Card } from '../../ui/card'
import { Checkbox } from '../../ui/Checkbox'
import { Input } from '../../ui/Input'
import { Typography } from '../../ui/Typography'

import style from './login-form.module.scss'

const schema = z.object({
  // login: z
  //   .string()
  //   .trim()
  //   .nonempty('Enter login')
  //   .min(3, { message: 'Must be 3 or more characters long' }),
  email: z.string().trim().nonempty('Enter email').email('Invalid email'),
  password: z
    .string()
    .trim()
    .min(5, { message: 'Must be 5 or more characters long' })
    .emoji({ message: 'Contains non-emoji characters' })
    .nonempty('Enter password'),
  rememberMe: z.boolean().optional(),
})

type FormValues = z.infer<typeof schema>

export const LoginForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  })

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

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
      <form onSubmit={handleSubmit(onSubmit)}>
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
