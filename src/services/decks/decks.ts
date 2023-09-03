import { baseApi } from '../common/base-api'

import type {
  Card,
  Cards,
  Deck,
  DeckId,
  Decks,
  GetDeckParams,
  RetriveCardsInDeckParams,
  createCardArgs,
} from './types'

const decksApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getDecksList: builder.query<Decks, GetDeckParams>({
      query: args => ({
        url: 'decks',
        params: args,
      }),
      providesTags: ['Decks'],
    }),
    getDeck: builder.query<Deck, DeckId>({
      query: ({ id }) => ({
        url: 'decks/' + id,
      }),
    }),
    createDeck: builder.mutation<Deck, FormData>({
      query: data => ({
        url: 'decks',
        method: 'POST',
        body: data,
      }),
      // async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
      //   const state = getState() as RootState

      //   try {
      //     const res = await queryFulfilled
      //     // вытащить из стейта аргументы необходимые для передачи
      //     // const state = state.decksSlice
      //     const patchResult = dispatch(
      //       decksApi.util.updateQueryData(
      //         'getDecksList',
      //         { name: 'sdf', orderBy: 'asc-sd' },
      //         draft => {
      //           draft.items.push()
      //           draft.items.unshift(res.data)
      //         }
      //       )
      //     )
      //   } catch {
      //     // patchResult.undo()
      //     /**
      //      * Alternatively, on failure you can invalidate the corresponding cache tags
      //      * to trigger a re-fetch:
      //      * dispatch(api.util.invalidateTags(['Post']))
      //      */
      //   }
      // },
      invalidatesTags: ['Decks'],
    }),
    updateDeck: builder.mutation<Deck, DeckId & { formdata: FormData }>({
      query: ({ id, formdata }) => ({
        url: `decks/${id}`,
        method: 'PATCH',
        body: formdata,
      }),
      invalidatesTags: ['Decks'],
    }),
    deleteDeck: builder.mutation<Omit<Deck, 'author'>, Deck['id']>({
      query: id => ({
        url: `decks/${id}`,
        method: 'DELETE',
      }),
      // async onQueryStarted(id, { dispatch, queryFulfilled }) {
      //   const patchResult = dispatch(
      //     decksApi.util.updateQueryData('getDecksList', { currentPage: 1 }, draft => {
      //       draft.items = draft.items.filter(deck => deck.id !== id)
      //     })
      //   )

      //   try {
      //     await queryFulfilled
      //   } catch {
      //     patchResult.undo()
      //   }
      // },
      invalidatesTags: ['Decks'],
    }),
    retriveCardsInDeck: builder.query<Cards, DeckId & RetriveCardsInDeckParams>({
      query: ({ id, ...params }) => ({
        url: `decks/${id}/cards`,
        params,
      }),
    }),
    createCard: builder.mutation<Card, DeckId & createCardArgs>({
      query: ({ id, ...restArgs }) => ({
        url: `decks/${id}/cards`,
        method: 'POST',
        body: restArgs,
      }),
    }),
    retriveRandomCard: builder.query<Card, DeckId & { previousCardId?: string }>({
      query: ({ id, ...previousCardId }) => ({
        url: `decks/${id}/learn`,
        params: previousCardId,
      }),
    }),
    saveGradeCard: builder.mutation<
      unknown,
      { id: DeckId; cardId: Card['id']; grade: Card['rating'] }
    >({
      query: ({ id, ...restArgs }) => ({
        url: `decks/${id}/cards`,
        method: 'POST',
        body: restArgs,
      }),
    }),
  }),
})

export const {
  useGetDecksListQuery,
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useLazyGetDecksListQuery,
  useUpdateDeckMutation,
  useRetriveCardsInDeckQuery,
  useGetDeckQuery,
} = decksApi
