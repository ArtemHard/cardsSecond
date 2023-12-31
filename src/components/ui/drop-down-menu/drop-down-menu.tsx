import { ReactNode, useState, FC, CSSProperties } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

import style from './drop-down-menu.module.scss'

export type DropdownProps = {
  // children: ReactNode
  align?: 'start' | 'center' | 'end'
  trigger?: ReactNode
  className?: string
  style?: CSSProperties
} & DropdownMenu.DropdownMenuProps

export const DropDownMenu: FC<DropdownProps> = ({ children, trigger, ...restProps }) => {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu.Root onOpenChange={setOpen} modal {...restProps}>
      <DropdownMenu.Trigger asChild>
        <button className={style.triggerButton}>
          {trigger}
          {open && <div className={style.DropdownMenuArrow3}></div>}
        </button>
      </DropdownMenu.Trigger>
      {/* forceMount Useful when controlling animation */}

      <DropdownMenu.Portal className={style.portal}>
        <DropdownMenu.Content
          className={style.DropdownMenuContent}
          align="center"
          sideOffset={5}
          hideWhenDetached
        >
          {children}
          {/* <DropdownMenu.Arrow className={style['DropdownMenuArrow']} /> */}
          {/* <div className={style.DropdownMenuArrow2}></div> */}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

type DropDownMenuIconProps = {
  children: ReactNode
  icon?: ReactNode
} & DropdownMenu.DropdownMenuItemProps
export const DropDownMenuIcon = ({
  onSelect,
  disabled,
  className,
  children,
  icon,
  ...restProps
}: DropDownMenuIconProps) => {
  const classNames = clsx(style.DropdownMenuItem, className)

  return (
    <>
      <DropdownMenu.Item
        onSelect={onSelect}
        className={classNames}
        disabled={disabled}
        {...restProps}
      >
        {icon}
        {children}
      </DropdownMenu.Item>
    </>
  )
}
