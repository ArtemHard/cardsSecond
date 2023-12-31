import * as CheckboxRadix from '@radix-ui/react-checkbox'
import * as LabelRadix from '@radix-ui/react-label'
import { clsx } from 'clsx'

import { CheckIcon } from '../../../assets/icons/Check'
import { Typography } from '../Typography'

import s from './checkbox.module.scss'
export type CheckboxProps = {
  className?: string
  checked?: boolean
  onValueChange?: (checked: boolean) => void
  disabled?: boolean
  required?: boolean
  label?: string
  id?: string
  position?: 'left'
}

export const Checkbox = ({
  checked,
  onValueChange,
  position,
  disabled,
  required,
  label,
  id,
  className,
}: CheckboxProps) => {
  const classNames = {
    // container: clsx(s.container, className),
    container: s.container + ' ' + className,
    // eslint-disable-next-line prettier/prettier
    buttonWrapper:
      s.buttonWrapper + ' ' + (disabled && s.disabled) + ' ' + (position === 'left' && s.left),
    // buttonWrapper: clsx(s.buttonWrapper, disabled && s.disabled, position === 'left' && s.left),
    root: s.root,
    indicator: s.indicator,
    label: clsx(s.label, disabled && s.disabled),
  }

  return (
    <div className={classNames.container}>
      <LabelRadix.Root asChild>
        <Typography variant="body2" className={classNames.label} as={'label'}>
          <div className={classNames.buttonWrapper}>
            <CheckboxRadix.Root
              className={classNames.root}
              checked={checked}
              onCheckedChange={onValueChange}
              disabled={disabled}
              required={required}
              id={id}
            >
              {checked && (
                <CheckboxRadix.Indicator className={classNames.indicator} forceMount>
                  <CheckIcon />
                </CheckboxRadix.Indicator>
              )}
            </CheckboxRadix.Root>
          </div>
          {label}
        </Typography>
      </LabelRadix.Root>
    </div>
  )
}
