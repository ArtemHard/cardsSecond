import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import style from './typography.module.scss'

export type TypographyProps<T extends ElementType = 'p'> = {
  as?: T
  children?: ReactNode
  variant?:
    | 'large'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'body1'
    | 'body2'
    | 'subtitle1'
    | 'subtitle2'
    | 'caption'
    | 'overline'
    | 'link1'
    | 'link2'
    | 'error'
  className?: string
} & ComponentPropsWithoutRef<T>

export const Typography = <T extends ElementType = 'p'>({
  as,
  className,
  variant = 'body1',
  ...restProps
}: TypographyProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>) => {
  const Component = as || 'p'
  const classNames = `${style[variant]} + ' ' + ${className}`

  return <Component className={classNames}>Typography</Component>
}
