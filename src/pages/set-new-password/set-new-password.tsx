import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import {
  CreatePasswordForm,
  FormValuesCreatePassword,
} from '../../components/auth/create-password-form'
import { PATH } from '../../routes'
import { useResetPasswordMutation } from '../../services/auth'
import { errorCommonHandler } from '../../services/common'

export const SetNewPasswordPage = () => {
  const [resetPassword] = useResetPasswordMutation()
  const { token } = useParams()
  const navigate = useNavigate()
  const onSubmit = (data: FormValuesCreatePassword) => {
    resetPassword({
      password: data.password,
      token: token ?? '',
    })
      .unwrap()
      .then(() => {
        toast.success('The password was updated')
        navigate(PATH.LOGIN)
      })
      .catch(err => toast.error(errorCommonHandler(err)))
  }

  return <CreatePasswordForm onSubmit={onSubmit} />
}
