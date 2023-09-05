import { log } from 'console'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Button from '../../ui/button/button'
import { ControlledInput } from '../../ui/controlled/controlled-input'
import { ModalFooter } from '../../ui/modal'
import { SelectRoot } from '../../ui/select'

const schema = z.object({
  question: z
    .string()
    .trim()
    .min(3, { message: 'Must be 3 or more characters long' })
    .nonempty('Enter deck name')
    .optional(),
  answer: z.any().optional(),
  questionImg: z.any().optional(),
  answerImg: z.any().optional(),
  questionVideo: z.any().optional(),
  answerVideo: z.any().optional(),
})

export type FormValuesCreateCard = z.infer<typeof schema>

type CardFromProps = {
  submitTextButton: string
  onSubmit: (data: FormValuesCreateCard) => void
  setIsOpenModal: (isOpen: boolean) => void
}

export const CardFrom = ({ onSubmit, setIsOpenModal, submitTextButton }: CardFromProps) => {
  const onChange = (v: string) => {
    console.log('choose ' + v)
  }

  const { handleSubmit, register, control, watch } = useForm<FormValuesCreateCard>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <SelectRoot onChangeValue={onChange} value={['Text', 'Picture']} /> */}
      <ControlledInput type={'text'} control={control} name="question" label="Question" />
      <ControlledInput type={'text'} control={control} name="answer" label="Answer" />
      <ModalFooter>
        <Button variant={'primary'} type="submit">
          {submitTextButton}
        </Button>
        <Button variant={'secondary'} type="submit" onClick={() => setIsOpenModal(false)}>
          Cancel
        </Button>
      </ModalFooter>
    </form>
  )
}
