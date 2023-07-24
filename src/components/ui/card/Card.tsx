import { ComponentPropsWithoutRef, forwardRef } from 'react'

import style from './card.module.scss'

export type CardProps = ComponentPropsWithoutRef<'div'>

export const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...restProps }, ref) => {
  const classNames = `${className} ${style['root']}`

  return <div ref={ref} className={classNames} {...restProps}></div>
})
