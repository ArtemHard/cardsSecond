import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z
  .object({
    email: z.string().trim().nonempty('Enter email').email('Invalid email'),
    password: z
      .string()
      .trim()
      .min(4, { message: 'Must be 4 or more characters long' })
      .emoji({ message: 'Contains non-emoji characters' })
      .nonempty('Enter password'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // path of error
  })

export type FormValuesSignUp = z.infer<typeof schema>

export const useSignUpForm = (onSubmit: any) => {
  const { handleSubmit, ...rest } = useForm<FormValuesSignUp>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  })

  return { handleSubmit: handleSubmit(onSubmit), ...rest }
}
