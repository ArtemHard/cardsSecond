import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  // login: z
  //   .string()
  //   .trim()
  //   .nonempty('Enter login')
  //   .min(3, { message: 'Must be 3 or more characters long' }),
  email: z.string().trim().nonempty('Enter email').email('Invalid email'),
  password: z
    .string()
    .trim()
    .min(5, { message: 'Must be 5 or more characters long' })
    .emoji({ message: 'Contains non-emoji characters' })
    .nonempty('Enter password'),
  rememberMe: z.boolean().optional(),
})

type FormValues = z.infer<typeof schema>

export const useLoginForm = (onSubmit: any) => {
  const { handleSubmit, ...rest } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  })

  return { handleSubmit: handleSubmit(onSubmit), ...rest }
}
