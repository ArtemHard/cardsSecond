import { createApi } from '@reduxjs/toolkit/query/react'

import { customFetchBase } from './base-api-with-refresh'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: customFetchBase,
  tagTypes: ['me', 'Decks'],
  endpoints: () => ({}),
})
