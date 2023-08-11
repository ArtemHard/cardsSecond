import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { RadioButtons, RadioGroupProps } from '../../radio-buttons'

type ControlledCheckboxProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<RadioGroupProps, 'onValueChange' | 'name' | 'defaultValue'>
export const ControlledRadio = <T extends FieldValues>({
  control,
  name,
  defaultValue,
  rules,
  shouldUnregister,
  ...radioGroupProps
}: ControlledCheckboxProps<T>) => {
  const {
    field: { onChange },
  } = useController({
    control,
    name,
    defaultValue,
    rules,
    shouldUnregister,
  })

  return (
    <RadioButtons
      defaultValue={defaultValue}
      onValueChange={onChange}
      id={name}
      {...radioGroupProps}
    />
  )
}
