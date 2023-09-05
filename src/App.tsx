import { Outlet } from 'react-router-dom'

import style from './app.module.scss'
import { Header } from './components/layout/Header/Header'
import { useAuthMeQuery, useLogOutMutation } from './services/auth'

export function App() {
  const { data } = useAuthMeQuery()
  const [signOut] = useLogOutMutation()
  const userInfo = data
    ? { name: data?.name, email: data?.email, avatarSrc: data.avatar }
    : undefined

  return (
    <div className={style.container}>
      <Header isAuth={!!data} signOutClick={signOut} userInfo={userInfo} />
      <main className={style.outletWrapper}>
        <Outlet />
      </main>
    </div>
  )
}
