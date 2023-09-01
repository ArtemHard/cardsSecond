import { forwardRef } from 'react'

import * as Select from '@radix-ui/react-select'
import { SelectItemProps } from '@radix-ui/react-select'

import { ArrowDown } from '../../../assets/icons'

import s from './select.module.scss'

type Props = {
  disabled?: boolean
  value?: string[]
}

export const SelectRoot = (props: Props) => {
  return (
    <Select.Root>
      <div className={s.headerSelect}>
        Select-Box
        <Select.Trigger disabled={props.disabled} className={s.trigger}>
          <Select.Value placeholder="Select-Box" />
          <ArrowDown />
        </Select.Trigger>
      </div>
      <Select.Portal>
        <Select.Content className={s.SelectContent} position="popper" sideOffset={0}>
          <Select.Viewport>
            {props.value &&
              props.value.map(el => {
                return (
                  <SelectItem key={el} className={s.item} value={el}>
                    {el}
                  </SelectItem>
                )
              })}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, value, ...props }, ref) => {
    return (
      <Select.Item className={className} value={value} {...props} ref={ref}>
        <Select.ItemText>{children}</Select.ItemText>
      </Select.Item>
    )
  }
)
