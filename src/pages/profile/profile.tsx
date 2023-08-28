import { Navigate } from 'react-router-dom'

import { PersonalInfo } from '../../components/profile/personal-info'
import { PATH } from '../../routes'
import { useAuthMeQuery, useLogOutMutation, useUpdateUserMutation } from '../../services/auth'

import style from './profile.style.module.scss'

export const Profile = () => {
  const { data } = useAuthMeQuery()
  const [onLogOutHandler] = useLogOutMutation()
  const [updateuserInfo] = useUpdateUserMutation()

  const onAvatarChange = (fileImg: File) => {
    const formData = new FormData()

    formData.append('avatar', fileImg)
    updateuserInfo(formData)
  }

  const onNameChange = (newName: string) => {
    const formData = new FormData()

    formData.append('name', newName)
    updateuserInfo(formData)
  }

  if (!data) return <Navigate to={PATH.LOGIN} />
  else
    return (
      <div className={style.root}>
        <PersonalInfo
          name={data?.name}
          email={data?.email}
          avatarSrc={data?.avatar}
          onlogOut={onLogOutHandler}
          onAvatarChange={onAvatarChange}
          onNameChange={onNameChange}
        />
      </div>
    )
}
