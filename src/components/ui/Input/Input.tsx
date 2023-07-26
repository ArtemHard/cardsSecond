import { ComponentPropsWithoutRef, forwardRef } from 'react'

import clsx from 'clsx'

import { Typography } from '../Typography'

import style from './Input.module.scss'

export type InputProps = {
  label?: string
  errorMessage?: string
  className?: string
} & ComponentPropsWithoutRef<'input'>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, errorMessage, placeholder, type, label, onChange, ...restProps }, ref) => {
    const classNames = {
      root: style.root,
      input: clsx(className, style.input),
      label: style.label,
    }

    return (
      <div className={classNames.root}>
        <Typography variant="caption">{label}</Typography>
        <input type="text" name="" className={classNames.input} placeholder={placeholder} />
      </div>
    )
  }
)
