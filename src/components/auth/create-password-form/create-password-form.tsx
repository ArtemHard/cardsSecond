import Button from '../../ui/button/button'
import { Card } from '../../ui/card'
import { Input } from '../../ui/drop-down-menu'
import { Typography } from '../../ui/Typography'

import { CreatePasswordFormProps, useCreatePasswordForm } from './create-password-form'
import style from './create-password-form.module.scss'

export const CreatePasswordForm = (onSubmit: CreatePasswordFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useCreatePasswordForm(onSubmit)

  return (
    <Card className={style.card}>
      <Typography as="h1" variant="h1" className={style.title}>
        Create new password
      </Typography>
      <form onSubmit={handleSubmit}>
        <Input
          {...register('password')}
          errorMessage={errors.password?.message}
          type="password"
          label={'Password'}
          className={style.textField}
        />
        <Typography variant="body2" className={style.text}>
          Create new password and we will send you further instructions to email
        </Typography>
        <Button type="submit" fullWidth className={style.button}>
          Create New Password
        </Button>
      </form>
    </Card>
  )
}
