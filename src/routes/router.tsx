import { Navigate, Outlet, RouteObject, createBrowserRouter } from 'react-router-dom'

import { App } from '../App'

import { PATH } from '.'

const publicRoutes: RouteObject[] = [
  {
    path: PATH.LOGIN,
    element: <div>login</div>,
  },
  {
    path: PATH.REGISTRATION,
    element: <div>Sign In</div>,
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
    element: <div>CARDS</div>,
  },
  {
    path: PATH.PROFILE,
    element: <div>PROFILE</div>,
  },
  {
    path: PATH.LEARN,
    element: <div>LEARN</div>,
  },
  {
    path: PATH.PACKS,
    element: <div>Packs</div>,
  },
]

function PrivateRoutes() {
  const isAuthenticated = false

  return isAuthenticated ? <Outlet /> : <Navigate to={PATH.LOGIN} />
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <PrivateRoutes />,
        children: privateRoutes,
      },
      ...publicRoutes,
    ],
  },
])
