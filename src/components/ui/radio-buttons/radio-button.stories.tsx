import { DevTool } from '@hookform/devtools'
import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'

import Button from '../button/button'
import { ControlledRadio } from '../controlled/controlled-radio'

import { RadioButtons } from '.'

const meta = {
  title: 'Components/RadioButtons',
  component: RadioButtons,
  tags: ['autodocs'],
} satisfies Meta<typeof RadioButtons>

export default meta
type Story = StoryObj<typeof meta>

const options = [
  {
    label: 'не знал',
    value: '1',
  },
  {
    label: 'забыл',
    value: '2',
  },
  {
    label: 'долго думал',
    value: '3',
  },
  {
    label: 'перепутал',
    value: '4',
  },
  {
    label: 'знал',
    value: '5',
  },
]

// "не знал", "забыл", "долго думал", "перепутал", "знал"
export const Default: Story = {
  args: {
    defaultValue: '3',
    options,
  },
}
export const Disabled: Story = {
  args: {
    defaultValue: '3',
    options,
    disabled: true,
  },
}

type formType = {
  isKnow: string
}
export const RadioControll = {
  render: () => {
    const options = [
      {
        label: '1',
        value: '1',
      },
      {
        label: '2',
        value: '2',
      },
      {
        label: '3',
        value: '3',
      },
    ]
    const { handleSubmit, control } = useForm<formType>({
      defaultValues: {
        isKnow: '3',
      },
    })
    const onSubmit = (data: formType) => {
      alert('you choose=>>> ' + data.isKnow)
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <DevTool control={control} />
        <ControlledRadio name={'isKnow'} options={options} control={control} defaultValue={'3'} />
        <Button type={'submit'}>Submit</Button>
      </form>
    )
  },
}
