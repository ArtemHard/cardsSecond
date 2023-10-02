import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { appActions } from '../../app/app.slice'
import {
  ForgotPasswordForm,
  RecoverPasswordValues,
} from '../../components/auth/forgot-password-form'
import { PATH } from '../../routes'
import { useRecoverPasswordMutation } from '../../services/auth'
import { errorCommonHandler } from '../../services/common'
import { useActions } from '../../services/common/useActions'

export const ForgotPasswordPage = () => {
  const { updateEmail } = useActions(appActions)
  const [recoverPassword] = useRecoverPasswordMutation()
  const navigate = useNavigate()
  const onSubmit = (data: RecoverPasswordValues) => {
    recoverPassword({
      email: data.email,
      html: "<h1>Hi, ##name##</h1><p>Click <a href='https://cards-ecru-three.vercel.app/set-new-password/##token##'>here</a> to recover your password</p>",
    })
      .unwrap()
      .then(() => {
        updateEmail(data.email)
        navigate(PATH.CHECK_EMAIL)
      })
      .catch(err => toast.error(errorCommonHandler(err)))
  }

  return <ForgotPasswordForm onSubmit={onSubmit} />
}
