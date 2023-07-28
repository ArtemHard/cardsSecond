/* eslint-disable import/order */
import { useEffect, useState } from 'react'
import style from './avatar.module.scss'

type AvatarProps = {
  src?: string
  name: string
}

export const Avatar = ({ src, name }: AvatarProps) => {
  const [isAvaBroken, setIsAvaBroken] = useState(false)

  const errorHandler = () => {
    setIsAvaBroken(true)
  }

  useEffect(() => {
    setIsAvaBroken(false)
  }, [src])

  return isAvaBroken || !src ? (
    <AvatarBroken name={name} />
  ) : (
    <img className={style.avatar} src={src} alt={name + ' avatar'} onError={errorHandler} />
  )
}

type AvatarBrokenProps = { name: string }
const AvatarBroken = ({ name }: AvatarBrokenProps) => {
  const initials = name.substring(0, 2)

  // Генерируем уникальный цвет на основе имени
  const hashCode = (s: string) => {
    return s.split('').reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0)

      return a & a
    }, 0)
  }

  const color = `hsl(${hashCode(name) % 360}, 50%, 50%)`

  // Отрисовываем аватарку с заглушкой
  return (
    <div className={style.avatarBroken} style={{ backgroundColor: color }}>
      <span className={style.initialsBroken}>{initials}</span>
    </div>
  )
}
