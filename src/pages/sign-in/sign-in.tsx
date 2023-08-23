import { Navigate, useNavigate } from 'react-router-dom'

import { LoginForm } from '../../components/auth/login-form'
import { FormValuesLogin } from '../../components/auth/login-form/use-login-form'
import { PATH } from '../../routes'
import { useAuthMeQuery, useLogInMutation } from '../../services/auth'

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
        navigate(PATH.PACKS)
      })
      .catch(err => {
        alert(err?.data?.message)
        // alert(error)
      })
  }

  if (isLoadingMe) return <div>LOADING...</div>
  if (meData) return <Navigate to={PATH.PACKS} />

  return <LoginForm onSubmit={submitHandler} isSubmitting={isLoggingIn} />
}
