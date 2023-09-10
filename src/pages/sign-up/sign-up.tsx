import { Navigate, useNavigate } from 'react-router-dom'

import { SignUpForm } from '../../components/auth/sign-up-form'
import { FormValuesSignUp } from '../../components/auth/sign-up-form/sign-up-form'
import { PATH } from '../../routes'
import { useAuthMeQuery, useSignUpMutation } from '../../services/auth'
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
        navigate(PATH.DECKS)
      })
      .catch(err => {
        alert(err?.data?.message)
      })
  }

  if (isLoadingMe) return <div>LOADING...</div>
  if (meData) return <Navigate to={PATH.DECKS} />

  return <SignUpForm onSubmit={submitHandler} isSubmitting={isSugnUpFetching} />
}
