/* eslint-disable import/order */
import { ComponentProps, useEffect, useState } from 'react'
import style from './avatar.module.scss'
import clsx from 'clsx'

type AvatarProps = {
  // src?: ComponentProps<'img'>['src']
  name: string
  // className: ComponentProps<'img'>['className']
} & ComponentProps<'img'>

export const Avatar = ({ src, name, className }: AvatarProps) => {
  const [isAvaBroken, setIsAvaBroken] = useState(false)

  const errorHandler = () => {
    setIsAvaBroken(true)
  }

  useEffect(() => {
    setIsAvaBroken(false)
  }, [src])

  const classNames = {
    // container: clsx(s.container, className),
    containerAvaBroken: clsx(style.avatarBroken, style.standartSize, className),
    // eslint-disable-next-line prettier/prettier
    textInAvaBroken: clsx(style.initialsBroken),

    // buttonWrapper: clsx(s.buttonWrapper, disabled && s.disabled, position === 'left' && s.left),
    img: clsx(style.avatar, style.standartSize, className),
  }

  return isAvaBroken || !src ? (
    <AvatarBroken
      name={name}
      containerAvaBrokenStyle={classNames.containerAvaBroken}
      textInAvaBrokenStyle={classNames.textInAvaBroken}
    />
  ) : (
    <img className={classNames.img} src={src} alt={name + ' avatar'} onError={errorHandler} />
  )
}

type AvatarBrokenProps = {
  name: string
  containerAvaBrokenStyle: string
  textInAvaBrokenStyle: string
}
const AvatarBroken = ({
  name,
  containerAvaBrokenStyle,
  textInAvaBrokenStyle,
}: AvatarBrokenProps) => {
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
    <div className={containerAvaBrokenStyle} style={{ backgroundColor: color }}>
      <span className={textInAvaBrokenStyle}>{initials}</span>
    </div>
  )
}
