import { forwardRef } from 'react'

import * as Select from '@radix-ui/react-select'
import { SelectItemProps } from '@radix-ui/react-select'

import { ChevronUp } from '../../../assets/icons'

import s from './select.module.scss'

type SelectType = {
  disabled?: boolean
  value?: string[]
  onChangeValue: (value: string) => void
}

export const SelectRoot = (props: SelectType) => {
  const { disabled, value, onChangeValue } = props
  const changeCurrentValue = (value: string) => {
    onChangeValue(value)
    console.log(value)
  }

  return (
    <Select.Root onValueChange={changeCurrentValue}>
      <div className={s.headerSelect}>
        Select-Box
        <Select.Trigger disabled={disabled} className={s.trigger}>
          <Select.Value placeholder="Select-Box" />
          <ChevronUp />
        </Select.Trigger>
      </div>
      <Select.Portal>
        <Select.Content className={s.SelectContent} position="popper" sideOffset={0}>
          <Select.Viewport>
            {value &&
              value.map(el => {
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
