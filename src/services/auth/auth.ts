import { baseApi } from '../common/base-api'

import type {
  LoginArgs,
  LoginResponse,
  SignUpArgs,
  Profile,
  ResendVerificationEmailArgs,
} from './types'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    authMe: builder.query<Profile | null, void>({
      query: () => {
        return { url: 'auth/me' }
      },
      extraOptions: {
        maxRetries: 0,
      },
      providesTags: ['me'],
    }),
    // FormData = {avatar: File, name: string, email: string}
    updateUser: builder.mutation<Profile, FormData>({
      query: body => ({
        url: `auth/me`,
        method: 'PATCH',
        body: body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          authApi.util.updateQueryData('authMe', undefined, draft => {
            const name = arg.get('name')

            if (typeof name === 'string' && draft) {
              draft.name = name
            }
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      transformErrorResponse: response => {
        // if (isRejectedWithValue(response)) {
        //   console.warn('We got a rejected action!')
        //   console.warn(response.error.message)
        // }
        console.warn(response.data)
      },
      invalidatesTags: ['me'],
    }),
    signUp: builder.mutation<Profile, SignUpArgs>({
      query: body => ({
        url: `auth/sign-up`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['me'],
    }),
    logIn: builder.mutation<LoginResponse, LoginArgs>({
      query: body => ({
        url: 'auth/login',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['me'],
    }),
    verifyEmail: builder.mutation<void, { code: string }>({
      query: body => ({
        url: 'auth/verify-email',
        method: 'POST',
        body: body,
      }),
    }),
    resendVerificationEmail: builder.mutation<void, ResendVerificationEmailArgs>({
      query: body => ({
        url: 'auth/resend-verification-email',
        method: 'POST',
        body: body,
      }),
    }),

    logOut: builder.mutation<void, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          authApi.util.updateQueryData('authMe', undefined, draft => (draft = null))
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()

          /**
           * Alternatively, on failure you can invalidate the corresponding cache tags
           * to trigger a re-fetch:
           * dispatch(api.util.invalidateTags(['Post']))
           */
        }
      },
      invalidatesTags: ['me'],
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: 'auth/refresh-token',
        method: 'POST',
      }),
    }),
    recoverPassword: builder.mutation<void, ResendVerificationEmailArgs>({
      query: body => ({
        url: 'auth/resend-verification-email',
        method: 'POST',
        body: body,
      }),
    }),
    resetPassword: builder.mutation<void, Pick<SignUpArgs, 'password'> & { token: string }>({
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

export const {
  useLogInMutation,
  useAuthMeQuery,
  useSignUpMutation,
  useLogOutMutation,
  useLazyAuthMeQuery,
  useUpdateUserMutation,
} = authApi
