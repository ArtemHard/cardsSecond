import { Navigate, Outlet, RouteObject, createBrowserRouter } from 'react-router-dom'

import { App } from '../App'
import { Loader } from '../components/loader'
import { ErrorPage } from '../pages/404/ErrorPage'
import { Cards } from '../pages/cards'
import { CheckEmailPage } from '../pages/check-email'
import { Decks } from '../pages/decks'
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password'
import { Learn } from '../pages/learn'
import { Profile } from '../pages/profile/profile'
import { SetNewPasswordPage } from '../pages/set-new-password'
import { SignInPage } from '../pages/sign-in'
import { SignUpPage } from '../pages/sign-up'
import { useAuthMeQuery } from '../services/auth'
import { GlobalHistory } from '../utils/GlovalNavigate'

import { PATH } from '.'

const publicRoutes: RouteObject[] = [
  {
    path: PATH.LOGIN,
    element: <SignInPage />,
  },
  {
    path: PATH.REGISTRATION,
    element: <SignUpPage />,
  },
  {
    path: PATH.CHECK_EMAIL,
    element: <CheckEmailPage />,
  },
  {
    path: PATH.FORGOT_PASSWORD,
    element: <ForgotPasswordPage />,
  },
  {
    path: PATH.SET_NEW_PASSWORD,
    element: <SetNewPasswordPage />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: PATH.CARDS,
    element: <Cards />,
  },
  {
    path: PATH.PROFILE,
    element: <Profile />,
  },
  {
    path: PATH.LEARN,
    element: <Learn />,
  },
  {
    path: PATH.DECKS,
    element: <Decks />,
  },
]

function PrivateRoutes() {
  const { data, isLoading } = useAuthMeQuery()
  const isAuth = !!data

  if (isLoading) return <Loader />

  return isAuth ? <Outlet /> : <Navigate to={PATH.LOGIN} />
}

export const router = createBrowserRouter([
  {
    element: <GlobalHistory />,
    errorElement: <ErrorPage />,
    children: [
      {
        // path: '/',
        element: <App />,
        children: [
          {
            element: <PrivateRoutes />,
            children: privateRoutes,
          },
          ...publicRoutes,
        ],
      },
    ],
  },
])
