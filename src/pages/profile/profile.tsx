import { Navigate, useNavigate } from 'react-router-dom'

import { PersonalInfo } from '../../components/profile/personal-info'
import { PATH } from '../../routes'
import { useAuthMeQuery, useLogOutMutation, useUpdateUserMutation } from '../../services/auth'

import style from './profile.style.module.scss'

export const Profile = () => {
  const { data, currentData } = useAuthMeQuery()
  const [onLogOutHandler] = useLogOutMutation()
  const [updateuserInfo] = useUpdateUserMutation()
  const navigate = useNavigate()

  console.log(data)
  console.log(currentData)

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

  const signOutHandler = () => {
    onLogOutHandler()
      .unwrap()
      .then(() => {
        navigate(PATH.LOGIN)
      })
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
