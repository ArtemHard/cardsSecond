import { useState } from 'react'

import { useController } from 'react-hook-form'

import { LogoutSvg } from '../../../assets/icons'
import { EditPenSvg } from '../../../assets/icons/EditPenSvg'
import { Avatar } from '../../ui/avatar'
import Button from '../../ui/button/button'
import { Card } from '../../ui/card'
import { Input } from '../../ui/Input'
import { Typography } from '../../ui/Typography'

import { usePersonalInfoForm } from './personal-info'
import style from './personal-info.module.scss'

type PersonalInfoProps = {
  email: string
  name: string
  avatarSrc?: string
  // onlogOut: () => void
  // onAvatarChange: (newAvatar: string) => void
  // onNameChange: (newName: string) => void
}

export const PersonalInfo = ({ name, email, avatarSrc }: PersonalInfoProps) => {
  const [editMode, setEditMode] = useState(false)

  const updateNicknameHandler = (data: { name: string }) => {
    if (data.name === name) {
      console.warn('you write the same nickname')

      return setEditMode(false)
    }
    alert('Form was send')
    setEditMode(false)
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = usePersonalInfoForm(updateNicknameHandler, name)

  const {
    field: { value, onChange },
  } = useController({
    name: 'name',
    control,
    defaultValue: name,
  })

  const editModeOn = () => {
    setEditMode(true)
  }

  const infoRender = editMode ? (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <Input
        label="Nickname"
        value={value}
        onChange={onChange}
        defaultValue={name}
        className={style.input}
        errorMessage={errors.name?.message}
      />
      <Button
        variant="primary"
        fullWidth
        className={style.button + ' ' + style.buttonSave}
        type="submit"
      >
        Save Changes
      </Button>
    </form>
  ) : (
    <StaticInfoRender email={email} name={name} editModeCallback={editModeOn} />
  )

  return (
    <Card className={style.card}>
      <Typography as="h1" variant="large" className={style.title}>
        Personal Information
      </Typography>
      <div className={style.avatarContainer}>
        <div>
          <Avatar name={name} src={avatarSrc} className={style.avatar} />
          {!editMode && (
            <button className={style.editAvatarButton}>
              <EditPenSvg />
            </button>
          )}
        </div>
      </div>
      {infoRender}
    </Card>
  )
}

type StaticInfoRenderProps = {
  editModeCallback: () => void
} & Omit<PersonalInfoProps, 'avatarSrc'>

const StaticInfoRender = ({ email, name, editModeCallback }: StaticInfoRenderProps) => {
  const logOutHandler = () => {
    alert('You was log out')
  }

  return (
    <>
      <div className={style.nameContainer}>
        <Typography as="p" variant="h1" className={style.title}>
          {name}
        </Typography>
        <button
          className={style.editAvatarButton + ' ' + style.editNameButton}
          onClick={editModeCallback}
        >
          <EditPenSvg />
        </button>
      </div>
      <Typography variant="body2" className={style.email}>
        {email}
      </Typography>
      <Button variant="secondary" className={style.button} onClick={logOutHandler}>
        <LogoutSvg />
        Logout
      </Button>
    </>
  )
}
