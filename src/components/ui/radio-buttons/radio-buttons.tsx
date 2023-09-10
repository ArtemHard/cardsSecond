import { ComponentPropsWithoutRef, FC } from 'react'

import * as RadioGroup from '@radix-ui/react-radio-group'
import clsx from 'clsx'

import { Typography } from '../Typography'

import style from './radio-button.module.scss'

export type OptionRadio = {
  label: string
  value: string
}
export type RadioGroupProps = {
  options: OptionRadio[]
  defaultValue?: string
  // value?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  /**The name used when using this component inside a form*/
  name?: string
} & ComponentPropsWithoutRef<'div'>
// : FC<RadioGroupProps>
export const RadioButtons: FC<RadioGroupProps> = ({
  defaultValue,
  options,
  ...restProps
}: RadioGroupProps) => {
  const rootStyle = clsx(style.RadioGroupRoot, restProps.className)

  return (
    <RadioGroup.Root
      name={restProps.name}
      className={rootStyle}
      defaultValue={defaultValue}
      aria-label="View density"
      disabled={restProps.disabled}
      onValueChange={restProps.onValueChange}
    >
      {options.map(option => {
        return (
          <div key={option.value} style={{ display: 'flex', alignItems: 'center' }}>
            <RadioGroup.Item
              className={style.RadioGroupItem}
              value={option.value.toString()}
              id={option.label}
            >
              <div className={style.RadioGroupIndicatorEmptyCircle}>
                <RadioGroup.Indicator className={style.RadioGroupIndicator} />
              </div>
            </RadioGroup.Item>

            <Typography as="label" variant="body2" htmlFor={option.label} className={style.Label}>
              {option.label}
            </Typography>
          </div>
        )
      })}
    </RadioGroup.Root>
  )
}
