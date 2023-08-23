import { NavigateFunction, Outlet, useNavigate } from 'react-router-dom'

export let globalNavigate: NavigateFunction

export const GlobalHistory = () => {
  globalNavigate = useNavigate()

  return <Outlet />
}
