import { Outlet } from 'react-router-dom'

import style from './app.module.scss'
import { Header } from './components/layout/Header/Header'
import { useGetDecksQuery } from './services/common/base-api'

export function App() {
  const { data, isLoading, isError, error } = useGetDecksQuery()

  console.log(data)
  console.log(isLoading)
  console.log(isError)
  console.log(error)

  return (
    <div className={style.container}>
      <Header
        isAuth={true}
        signOutClick={() => alert('signOut')}
        userInfo={{ name: 'Artem', email: 'sdfgsdfg@mail.ru' }}
      />
      <div className={style.outletWrapper}>
        <Outlet />
      </div>
    </div>
  )
}
