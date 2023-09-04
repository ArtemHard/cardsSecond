import { log } from 'console'

import { DevTool } from '@hookform/devtools'
import { useForm } from 'react-hook-form'

import { ControlledInput } from '../../ui/controlled/controlled-input'
import { SelectRoot } from '../../ui/select'

export const CardFrom = () => {
  const onChange = (v: string) => {
    console.log('choose ' + v)
  }

  const { control } = useForm()

  return (
    <form>
      {/* <SelectRoot onChangeValue={onChange} value={['Text', 'Picture']} /> */}
      <ControlledInput type={'text'} name="Question" label="Question" />
      <ControlledInput type={'text'} name="Answer" label="Answer" />
    </form>
  )
}
