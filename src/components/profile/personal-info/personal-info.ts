import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Must be 2 or more characters long' })
    .nonempty('Enter nickname'),
})

type FormValues = z.infer<typeof schema>

export const usePersonalInfoForm = (onSubmit: (data: { name: string }) => void, name: string) => {
  const { handleSubmit, ...rest } = useForm<FormValues>({
    defaultValues: {
      name: name,
    },
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  })

  return { handleSubmit: handleSubmit(onSubmit), ...rest }
}
