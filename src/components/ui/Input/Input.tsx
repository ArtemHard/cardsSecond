import { ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import clsx from 'clsx'

import { EyeOff } from '../../../assets/icons'
import { CloseOutlineSvg } from '../../../assets/icons/CloseOutlineSvg'
import { EyeIconSvg } from '../../../assets/icons/EyeIconSvg'
import { SearchGlass } from '../../../assets/icons/SearchGlass'
import { Typography } from '../Typography'

import style from './Input.module.scss'

export type InputProps = {
  onValueChange?: (value: string) => void
  label?: string
  errorMessage?: string
  className?: string
} & ComponentPropsWithoutRef<'input'>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      errorMessage,
      placeholder,
      type = 'text',
      label,
      onChange,
      onValueChange,
      ...restProps
    },
    ref
  ) => {
    const classNames = {
      root: clsx(style.root, className),
      input: clsx(style.input, !!errorMessage && style.error),
      inputContainer: clsx(style.inputContainer, !!errorMessage && style.error),
    }
    const showIconHandler = () => setShowIcon(prev => !prev)
    const clearInputHandler = () => {
      onValueChange?.('')
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onValueChange?.(e.target.value)
    }
    const [showIcon, setShowIcon] = useState(true)

    return (
      <div className={classNames.root}>
        <Typography className={style.label}>{label}</Typography>
        <div className={classNames.inputContainer} tabIndex={0}>
          {type === 'search' && <SearchGlass className={style.leftIcon} />}
          <div className={style.inputWrapper}>
            <input
              type={generateType(type, showIcon)}
              ref={ref}
              className={classNames.input}
              placeholder={placeholder}
              onChange={handleChange}
              {...restProps}
            />
          </div>

          {type === 'password' && (
            <button type="button" className={style.rightIcon} onClick={showIconHandler}>
              {showIcon ? <EyeIconSvg /> : <EyeOff />}
            </button>
          )}
          {type === 'search' && (
            <button type="button" className={style.rightIcon} onClick={clearInputHandler}>
              <CloseOutlineSvg className={style.closeOutlineIcon} />
            </button>
          )}
        </div>
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
