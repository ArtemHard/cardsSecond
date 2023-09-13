import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  email: z.string().trim().nonempty('Enter email').email({ message: 'Invalid email address' }),
})

export type RecoverPasswordValues = z.infer<typeof schema>
export type ForgotPasswordFormProps = { onSubmit: (data: RecoverPasswordValues) => void }

export const useForgotPasswordForm = ({ onSubmit }: ForgotPasswordFormProps) => {
  const { handleSubmit, ...rest } = useForm<RecoverPasswordValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  })

  return { handleSubmit: handleSubmit(onSubmit), ...rest }
}
