import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { SignUpForm } from '../../components/auth/sign-up-form'
import { FormValuesSignUp } from '../../components/auth/sign-up-form/sign-up-form'
import { Loader } from '../../components/loader'
import { PATH } from '../../routes'
import { useAuthMeQuery, useSignUpMutation } from '../../services/auth'
import { errorCommonHandler } from '../../services/common'
// {
//   "email": rasselCrow@mail.ru,
//   "password": 1234,
// }
export const SignUpPage = () => {
  const { data: meData, isLoading: isLoadingMe } = useAuthMeQuery()
  const [signUp, { isLoading: isSugnUpFetching }] = useSignUpMutation()
  const navigate = useNavigate()

  const submitHandler = (data: FormValuesSignUp) => {
    const { email, password } = data

    signUp({ email, password, sendConfirmationEmail: false })
      .unwrap()
      .then(() => {
        toast.success('register was sucess')
        navigate(PATH.LOGIN)
      })
      .catch(err => {
        toast.error(errorCommonHandler(err))
      })
  }

  if (isLoadingMe) return <Loader />
  if (meData) return <Navigate to={PATH.DECKS} />

  return <SignUpForm onSubmit={submitHandler} isSubmitting={isSugnUpFetching} />
}
