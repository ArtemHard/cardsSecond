export type Profile = {
  avatar: string
  id: string
  email: string
  isEmailVerified: boolean
  name: string
  created: Date
  updated: Date
}
export type SignUpArgs = {
  email: string
  password: string
}

export type LoginArgs = SignUpArgs & {
  rememberMe: boolean
}

export type LoginResponse = {
  accessToken: string
}

export type ResendVerificationEmailArgs = {
  html: string
  userId: string
  subject: string
}
export type RecoveryPasswordArgsArgs = Omit<ResendVerificationEmailArgs, 'userId'> & {
  email: string
}
