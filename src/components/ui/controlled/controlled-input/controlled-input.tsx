import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Input, InputProps } from '../../Input'

export type ControlledInputProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<InputProps, 'value' | 'onValueChange' | 'onChange' | 'id'>
export const ControlledInput = <T extends FieldValues>({
  control,
  name,
  defaultValue,
  rules,
  shouldUnregister,
  ...inputProps
}: ControlledInputProps<T>) => {
  const {
    field: { value, onChange },
  } = useController({
    control,
    name,
    defaultValue,
    rules,
    shouldUnregister,
  })

  return <Input value={value} onValueChange={onChange} id={name} {...inputProps} />
}
