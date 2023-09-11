import { RootState } from '../../app/store'
import { baseApi } from '../common/base-api'

import type {
  CardType,
  Cards,
  Deck,
  DeckId,
  Decks,
  GetDeckParams,
  RetriveCardsInDeckParams,
} from './types'

export const decksApi = baseApi.injectEndpoints({
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
      providesTags: ['deckInfo'],
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
      // async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
      //   const res = await queryFulfilled

      //   console.log(res)

      //   const patchResult = dispatch(
      //     decksApi.util.updateQueryData('getDeck', { id: arg.id }, draft => {
      //       Object.assign(draft, res.data)
      //     })
      //   )

      //   try {
      //     await queryFulfilled
      //   } catch {
      //     patchResult.undo()
      //   }
      // },
      invalidatesTags: ['Decks', 'deckInfo'],
    }),
    deleteDeck: builder.mutation<Omit<Deck, 'author'>, Deck['id']>({
      query: id => ({
        url: `decks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Decks'],
    }),
    retriveCardsInDeck: builder.query<Cards, DeckId & RetriveCardsInDeckParams>({
      query: ({ id, ...params }) => ({
        url: `decks/${id}/cards`,
        params,
      }),
      providesTags: ['cards'],
    }),
    createCard: builder.mutation<CardType, DeckId & { formdata: FormData }>({
      query: ({ id, formdata }) => ({
        url: `decks/${id}/cards`,
        method: 'POST',
        body: formdata,
      }),
      invalidatesTags: ['cards'],
    }),
    retriveRandomCard: builder.query<CardType, DeckId & { previousCardId?: string }>({
      query: ({ id, ...previousCardId }) => ({
        url: `decks/${id}/learn`,
        params: previousCardId,
      }),
    }),
    saveGradeCard: builder.mutation<
      unknown,
      { deckId: Deck['id']; cardId: CardType['id']; grade: CardType['grade'] }
    >({
      query: ({ deckId, ...restArgs }) => ({
        url: `decks/${deckId}/learn`,
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
  useCreateCardMutation,
  useLazyRetriveRandomCardQuery,
  useRetriveRandomCardQuery,
  useSaveGradeCardMutation,
} = decksApi
