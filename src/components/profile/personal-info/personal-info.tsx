import { useRef, useState, useEffect, ChangeEvent } from 'react'

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
  onlogOut: () => void
  onAvatarChange: (fileData: File) => void
  onNameChange: (newName: string) => void
}

export const PersonalInfo = ({
  name,
  email,
  avatarSrc,
  onlogOut,
  onAvatarChange,
  onNameChange,
}: PersonalInfoProps) => {
  const [editMode, setEditMode] = useState(false)

  const updateAvatarHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      onAvatarChange(file)
    }
  }

  const updateNicknameHandler = (data: { name: string }) => {
    if (data.name === name) {
      alert('you write the same nickname')

      return setEditMode(false)
    }
    onNameChange(data.name)
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

  const formRef = useRef<HTMLFormElement>(null)

  const infoRender = editMode ? (
    <form ref={formRef} onSubmit={handleSubmit} style={{ width: '100%' }}>
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
    <StaticInfoRender email={email} name={name} editModeCallback={editModeOn} onlogOut={onlogOut} />
  )

  // для закрытия editMode
  useEffect(() => {
    if (!editMode) return
    const handler = (e: globalThis.MouseEvent) => {
      if (!formRef.current?.contains(e.target as Node)) {
        setEditMode(false)
      }
    }
    const handleEscapeKeyPress = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setEditMode(false)
      }
    }

    document.addEventListener('mousedown', handler)
    document.addEventListener('keydown', handleEscapeKeyPress)

    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('keydown', handleEscapeKeyPress)
    }
  }, [editMode])

  return (
    <Card className={style.card}>
      <Typography as="h1" variant="large" className={style.title}>
        Personal Information
      </Typography>
      <div className={style.avatarContainer}>
        <div>
          <Avatar name={name} src={avatarSrc} className={style.avatar} />
          {!editMode && (
            <Button as="label" variant="secondary" className={style.editAvatarButton}>
              <EditPenSvg />
              <input
                type="file"
                aria-label="Change avatar"
                style={{ display: 'none' }}
                onChange={updateAvatarHandler}
              />
            </Button>
          )}
        </div>
      </div>
      {infoRender}
    </Card>
  )
}

type StaticInfoRenderProps = {
  editModeCallback: () => void
} & Pick<PersonalInfoProps, 'email' | 'name' | 'onlogOut'>

const StaticInfoRender = ({ email, name, editModeCallback, onlogOut }: StaticInfoRenderProps) => {
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
      <Button variant="secondary" className={style.button} onClick={onlogOut}>
        <LogoutSvg />
        Logout
      </Button>
    </>
  )
}
