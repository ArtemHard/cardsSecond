import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: 'Must be 3 or more characters long' })
    .nonempty('Enter deck name'),
  cover: z.any().optional(),
  isPrivate: z.boolean().optional(),
})

export type FormValuesCreateDeck = z.infer<typeof schema>
type useAddDeckFormType = {
  onSubmit: (data: FormValuesCreateDeck) => void
}
export const useAddDeckForm = ({ onSubmit }: useAddDeckFormType) => {
  const { handleSubmit, ...rest } = useForm<FormValuesCreateDeck>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  })

  return { handleSubmit: handleSubmit(onSubmit), ...rest }
}
