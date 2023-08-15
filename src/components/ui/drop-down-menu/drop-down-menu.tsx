import { ReactNode, useState, FC, CSSProperties } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { Typography } from '../Typography'

import style from './drop-down-menu.module.scss'

export type DropdownProps = {
  children: ReactNode
  align?: 'start' | 'center' | 'end'
  trigger?: ReactNode
  className?: string
  style?: CSSProperties
} & DropdownMenu.DropdownMenuProps

export const DropDownMenu: FC<DropdownProps> = ({
  children,
  align,
  className,
  trigger,
  ...restProps
}) => {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu.Root onOpenChange={setOpen} modal>
      <DropdownMenu.Trigger asChild>
        <div style={{ height: 'fit-content', width: 'fit-content', position: 'relative' }}>
          {trigger}
          {open && <div className={style.DropdownMenuArrow3}></div>}
        </div>
      </DropdownMenu.Trigger>
      {/* forceMount Useful when controlling animation */}

      <DropdownMenu.Portal className={style.portal}>
        <DropdownMenu.Content
          className={style.DropdownMenuContent}
          align="start"
          sideOffset={5}
          hideWhenDetached
        >
          {children}
          <DropdownMenu.Arrow className={style['DropdownMenuArrow']} />
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
  return (
    <>
      <DropdownMenu.Item
        onSelect={onSelect}
        // className={className}
        className={style.DropdownMenuItem}
        disabled={disabled}
        {...restProps}
      >
        {icon}
        <Typography variant="subtitle2" style={{ margin: 0 }}>
          {children}
        </Typography>
        {/* <DropdownMenu.Separator className="DropdownMenuSeparator" /> */}
      </DropdownMenu.Item>
    </>
  )
}
