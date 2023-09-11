import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { LoginForm } from '../../components/auth/login-form'
import { FormValuesLogin } from '../../components/auth/login-form/use-login-form'
import { Loader } from '../../components/loader'
import { PATH } from '../../routes'
import { useAuthMeQuery, useLogInMutation } from '../../services/auth'
import { errorCommonHandler } from '../../services/common'

// {
//   "email": rasselCrow@mail.ru,
//   "password": 1234,
// }

export const SignInPage = () => {
  const { data: meData, isLoading: isLoadingMe } = useAuthMeQuery()
  const [logIn, { isLoading: isLoggingIn }] = useLogInMutation()
  const navigate = useNavigate()

  const submitHandler = (data: FormValuesLogin) => {
    logIn(data)
      .unwrap()
      .then(() => {
        navigate(PATH.DECKS)
      })
      .catch(err => {
        toast.error(errorCommonHandler(err))
      })
  }

  if (isLoadingMe)
    return (
      <div>
        <Loader />
      </div>
    )

  if (meData) return <Navigate to={PATH.DECKS} />

  return <LoginForm onSubmit={submitHandler} isSubmitting={isLoggingIn} />
}
