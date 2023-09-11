import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import style from './app.module.scss'
import { Header } from './components/layout/Header/Header'
import { useAuthMeQuery, useLogOutMutation } from './services/auth'

import 'react-toastify/dist/ReactToastify.css'

export function App() {
  const { data } = useAuthMeQuery()
  const [signOut] = useLogOutMutation()
  const userInfo = data
    ? { name: data?.name, email: data?.email, avatarSrc: data.avatar }
    : undefined

  return (
    <div className={style.container}>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Header isAuth={!!data} signOutClick={signOut} userInfo={userInfo} />
      <main className={style.outletWrapper}>
        <Outlet />
      </main>
    </div>
  )
}
