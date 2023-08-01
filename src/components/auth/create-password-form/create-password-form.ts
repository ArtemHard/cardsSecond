import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  password: z
    .string()
    .trim()
    .min(5, { message: 'Must be 5 or more characters long' })
    .emoji({ message: 'Contains non-emoji characters' })
    .nonempty('Enter password'),
})

export type FormValues = z.infer<typeof schema>
export type CreatePasswordFormProps = { onSubmit: (data: FormValues) => void }

export const useCreatePasswordForm = ({ onSubmit }: CreatePasswordFormProps) => {
  const { handleSubmit, ...rest } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  })

  return { handleSubmit: handleSubmit(onSubmit), ...rest }
}
