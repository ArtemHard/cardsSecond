import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { LoginFormProps } from '.'

const schema = z.object({
  email: z.string().trim().nonempty('Enter email').email('Invalid email'),
  password: z
    .string()
    .trim()
    .min(5, { message: 'Must be 5 or more characters long' })
    .emoji({ message: 'Contains non-emoji characters' })
    .nonempty('Enter password'),
  rememberMe: z.boolean().optional(),
})

export type FormValuesLogin = z.infer<typeof schema>

export const useLoginForm = ({ onSubmit }: LoginFormProps) => {
  const { handleSubmit, ...rest } = useForm<FormValuesLogin>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  })

  return { handleSubmit: handleSubmit(onSubmit), ...rest }
}
