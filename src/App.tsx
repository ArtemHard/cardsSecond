import { Outlet, useNavigate } from 'react-router-dom'

import style from './app.module.scss'
import { Header } from './components/layout/Header/Header'
import { PATH } from './routes'
import { useAuthMeQuery, useLogOutMutation } from './services/auth'

export function App() {
  const { data } = useAuthMeQuery()
  const [signOut] = useLogOutMutation()
  const userInfo = data
    ? { name: data?.name, email: data?.email, avatarSrc: data.avatar }
    : undefined

  // console.log(data)
  // console.log(isLoading)
  // console.log(isError)
  // console.log(error)

  return (
    <div className={style.container}>
      <Header isAuth={!!data} signOutClick={signOut} userInfo={userInfo} />
      <div className={style.outletWrapper}>
        <Outlet />
      </div>
    </div>
  )
}
