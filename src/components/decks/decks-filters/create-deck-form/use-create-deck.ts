import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: 'Must be 3 or more characters long' })
    .max(30, { message: 'name must be shorter than or equal to 30 characters' })
    .nonempty('Enter deck name'),
  cover: z.any().optional(),
  isPrivate: z.boolean().optional(),
})

export type FormValuesCreateDeck = z.infer<typeof schema>
export type useAddDeckFormType = {
  onSubmit: (data: FormValuesCreateDeck) => void
  defaultData?: FormValuesCreateDeck
}
export const useAddDeckForm = ({ onSubmit, defaultData }: useAddDeckFormType) => {
  const { handleSubmit, ...rest } = useForm<FormValuesCreateDeck>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: defauldValuesFromProps(defaultData),
  })

  return { handleSubmit: handleSubmit(onSubmit), ...rest }
}

const defauldValuesFromProps = (
  defaultData: useAddDeckFormType['defaultData']
): FormValuesCreateDeck | undefined => {
  if (defaultData) {
    const { cover, name, isPrivate } = defaultData

    return {
      cover: cover,
      name: name,
      isPrivate: isPrivate,
    }
  } else return undefined
}
