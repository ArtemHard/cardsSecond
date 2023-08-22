import { baseApi } from '../common/base-api'

import type {
  LoginArgs,
  LoginResponse,
  SignUpArgs,
  Profile,
  ResendVerificationEmailArgs,
} from './types'

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    authMe: builder.query<Profile, unknown>({
      query: () => 'auth/me',
    }),
    updateUser: builder.mutation<Profile, Pick<Profile, 'name' | 'email'> & { avatar: File }>({
      query: body => ({
        url: `auth/sign-up`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'multipart/form-data;',
        },
        body: body,
      }),
    }),
    signUp: builder.mutation<Profile, SignUpArgs>({
      query: body => ({
        url: `auth/sign-up`,
        method: 'POST',
        body: body,
      }),
    }),
    logIn: builder.mutation<LoginResponse, LoginArgs>({
      query: body => ({
        url: 'auth/login',
        method: 'POST',
        body: body,
      }),
    }),
    verifyEmail: builder.mutation<unknown, { code: string }>({
      query: body => ({
        url: 'auth/verify-email',
        method: 'POST',
        body: body,
      }),
    }),
    resendVerificationEmail: builder.mutation<unknown, ResendVerificationEmailArgs>({
      query: body => ({
        url: 'auth/resend-verification-email',
        method: 'POST',
        body: body,
      }),
    }),

    logOut: builder.mutation({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: 'auth/refresh-token',
        method: 'POST',
      }),
    }),
    recoverPassword: builder.mutation<unknown, ResendVerificationEmailArgs>({
      query: body => ({
        url: 'auth/resend-verification-email',
        method: 'POST',
        body: body,
      }),
    }),
    resetPassword: builder.mutation<unknown, Pick<SignUpArgs, 'password'> & { token: string }>({
      query: body => ({
        url: 'auth/resend-verification-email',
        method: 'POST',
        params: {
          token: body.token,
        },
        body: body.password,
      }),
    }),
  }),
})
