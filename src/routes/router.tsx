import { Navigate, Outlet, RouteObject, createBrowserRouter } from 'react-router-dom'

import { App } from '../App'
import { Cards } from '../pages/cards'
import { Decks } from '../pages/decks'
import { Learn } from '../pages/learn'
import { Profile } from '../pages/profile/profile'
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
    element: <div>CHECK_EMAIL</div>,
  },
  {
    path: PATH.FORGOT_PASSWORD,
    element: <div>FORGOT_PASSWORD</div>,
  },
  {
    path: PATH.SET_NEW_PASSWORD,
    element: <div>SET_PASSWORD</div>,
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

  if (isLoading) return <div>Loading... Add normal loader</div>

  return isAuth ? <Outlet /> : <Navigate to={PATH.LOGIN} />
}

export const router = createBrowserRouter([
  {
    element: <GlobalHistory />,
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
