import { CSSProperties, ReactNode, forwardRef } from 'react'

import * as Select from '@radix-ui/react-select'
import { SelectItemProps } from '@radix-ui/react-select'
import clsx from 'clsx'

import { ChevronUp } from '../../../assets/icons'
import { Typography } from '../Typography'

import s from './select.module.scss'

type SelectType = {
  options: Array<string | number>
  placeholder?: ReactNode
  className?: string
} & Select.SelectProps

export const SelectRoot = ({
  disabled,
  value,
  onValueChange,
  options,
  placeholder,
  defaultValue,
  className,
  ...restProps
}: SelectType) => {
  const changeCurrentValue = (value: string) => {
    onValueChange?.(value)
  }

  return (
    <Select.Root onValueChange={changeCurrentValue} disabled={disabled} {...restProps}>
      {!!placeholder && (
        <Typography variant="body2" className={s.placeholder}>
          {placeholder}
        </Typography>
      )}
      <Select.Trigger className={clsx(s.trigger, className)}>
        <Select.Value placeholder={defaultValue} className={s.selectValue} />
        <ChevronUp style={{ rotate: '180deg' }} />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className={s.content} position="popper">
          <Select.Viewport>
            {options.map(el => (
              <SelectItem key={el} className={s.item} value={el.toString()}>
                {el}
              </SelectItem>
            ))}
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
