import { ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import clsx from 'clsx'

import { EyeIconSvg } from '../../../assets/icons/EyeIconSvg'
import EyeOff from '../../../assets/icons/EyeOff'
import { Typography } from '../Typography'

import style from './Input.module.scss'

export type InputProps = {
  label?: string
  errorMessage?: string
  className?: string
} & ComponentPropsWithoutRef<'input'>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, errorMessage, placeholder, type = 'text', label, onChange, ...restProps }, ref) => {
    const classNames = {
      root: style.root,
      input: clsx(className, style.input, !!errorMessage && style.error),
    }
    const onClickShowIconHandler = () => setShowIcon(prev => !prev)

    const [showIcon, setShowIcon] = useState(true)

    return (
      <div className={classNames.root}>
        <Typography className={style.label}>{label}</Typography>
        <input
          type={generateType(type, showIcon)}
          ref={ref}
          className={classNames.input}
          placeholder={placeholder}
        />
        {type === 'password' && (
          <button type="button" className={style.rightIcon} onClick={onClickShowIconHandler}>
            {showIcon ? <EyeIconSvg /> : <EyeOff />}
          </button>
        )}
        {errorMessage && <Typography className={style.errorLabel}>{errorMessage}</Typography>}
      </div>
    )
  }
)

const generateType = (type: React.HTMLInputTypeAttribute, showIcon: boolean) => {
  if (type === 'password' && showIcon) {
    return 'password'
  } else 'text'
}
