import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { FieldPath, useForm } from 'react-hook-form'
import { z } from 'zod'

import { ImageSvg } from '../../../assets/icons'
import deckImg from '../../../assets/images/reactJS.png'
import { CardType } from '../../../services/decks'
import Button from '../../ui/button/button'
import { ControlledInput } from '../../ui/controlled/controlled-input'
import { ModalFooter } from '../../ui/modal'
import { SelectRoot } from '../../ui/select'
import { Typography } from '../../ui/Typography'

import style from './cardForm.module.scss'

const schema = z.object({
  question: z
    .string()
    .trim()
    .min(3, { message: 'Must be 3 or more characters long' })
    .max(30, { message: 'Max 30 characters long' })
    .nonempty('Enter deck name'),
  answer: z.string().trim(),
  questionImg: z.any().optional(),
  answerImg: z.any().optional(),
  questionVideo: z.any().optional(),
  answerVideo: z.any().optional(),
})
// .superRefine((val, ctx) => {
//   // debugger
//   if (!val.answer && !val.answerImg?.[0] && !val.answerVideo) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: 'any answer type must be present',
//       path: ['answer'],
//     })
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: 'any answer type must be present',
//       path: ['answerImg'],
//     })
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: 'any answer type must be present',
//       path: ['answerVideo'],
//     })
//   }
// })
// .superRefine((val, ctx) => {
//   if (!val.question && !val.questionImg?.[0] && !val.questionVideo) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: 'any question type must be present',
//       path: ['question'],
//     })
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: 'any question type must be present',
//       path: ['questionImg'],
//     })
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: 'any question type must be present',
//       path: ['questionVideo'],
//     })
//   }
// })

export type FormValuesCreateCard = z.infer<typeof schema>

type FormatQuestions = 'Picture' | 'Text'

type CardFromProps = {
  submitTextButton: string
  onSubmit: (data: FormValuesCreateCard) => void
  setIsOpenModal: (isOpen: boolean) => void
  defaultData?: CardType
}

export const CardFrom = ({
  onSubmit,
  setIsOpenModal,
  submitTextButton,
  defaultData,
}: CardFromProps) => {
  const [format, setFormat] = useState<FormatQuestions>('Text')

  const onChange = (value: string) => {
    if (value === 'Picture' || value === 'Text') setFormat(value)
  }

  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValuesCreateCard>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      ...defaultData,
    },
  })

  const checkCoverType = (
    cover: any,
    watchParams: FieldPath<FormValuesCreateCard>
  ): string | undefined => {
    if (typeof cover === 'string') return cover
    if (cover instanceof FileList) {
      return watch(watchParams)[0] ? window.URL.createObjectURL(watch(watchParams)[0]) : undefined
    }

    return undefined
  }

  // useEffect(() => {
  //   if (format === 'Text') {
  //     resetField('answerImg', { defaultValue: defaultData?.answerImg })
  //     resetField('answerVideo', { defaultValue: defaultData?.answerVideo })
  //     resetField('questionImg', { defaultValue: defaultData?.questionImg })
  //     resetField('questionVideo', { defaultValue: defaultData?.questionVideo })
  //   }
  //   if (format === 'Picture') {
  //     resetField('answer', { defaultValue: defaultData?.answer })
  //     resetField('answerVideo', { defaultValue: defaultData?.answerVideo })
  //     resetField('question', { defaultValue: defaultData?.question })
  //     resetField('questionVideo', { defaultValue: defaultData?.questionVideo })
  //   }
  // }, [format])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.paramsContainer}>
      <div>
        <SelectRoot
          onValueChange={onChange}
          options={['Text', 'Picture']}
          defaultValue={options[0]}
          placeholder={'Choose a question format'}
        />
      </div>
      {format === 'Text' && (
        <>
          <ControlledInput
            type={'text'}
            control={control}
            name="question"
            label="Question"
            errorMessage={errors.question?.message}
          />
          <ControlledInput
            type={'text'}
            control={control}
            name="answer"
            label="Answer"
            errorMessage={errors.answer?.message}
          />
        </>
      )}

      {format === 'Picture' && (
        <>
          <Typography as="span" variant="subtitle2">
            Question:
          </Typography>
          <img
            src={checkCoverType(watch('questionImg'), 'questionImg') ?? deckImg}
            className={style.deckImg}
          ></img>
          <Button as="label" variant="secondary" fullWidth={true}>
            <ImageSvg />
            <Typography variant="subtitle2" as="span">
              Change Cover
            </Typography>
            <input type="file" {...register('questionImg')} style={{ display: 'none' }} />
          </Button>
          <Typography as="span" variant="subtitle2">
            Answer:
          </Typography>
          <img
            src={checkCoverType(watch('answerImg'), 'answerImg') ?? deckImg}
            className={style.deckImg}
          ></img>
          <Button as="label" variant="secondary" fullWidth={true}>
            <ImageSvg />
            <Typography variant="subtitle2" as="span">
              Change Cover
            </Typography>
            <input type="file" {...register('answerImg')} style={{ display: 'none' }} />
          </Button>
        </>
      )}
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
const options: FormatQuestions[] = ['Text', 'Picture']
