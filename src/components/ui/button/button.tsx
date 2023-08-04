import { ComponentPropsWithoutRef, ElementType, ReactNode, forwardRef } from 'react'

import s from './button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link'
  fullWidth?: boolean
  className?: string
} & ComponentPropsWithoutRef<T>

const Button = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>,
  ref: React.ForwardedRef<any>
) => {
  const { variant = 'primary', fullWidth, className, as: Component = 'button', ...rest } = props

  return (
    <Component
      ref={ref}
      className={`${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className ?? ''}`}
      {...rest}
    />
  )
}

export default forwardRef(Button)
