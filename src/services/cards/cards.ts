import { RootState } from '../../app/store'
import { baseApi } from '../common/base-api'
import { Card, decksApi } from '../decks'

const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCard: builder.query<Card, string>({
      query: id => ({
        url: 'cards/' + id,
      }),
    }),
    updateCard: builder.mutation<Card, { id: Card['id']; formdata: FormData }>({
      query: ({ id, formdata }) => ({
        url: 'cards/' + id,
        method: 'PATCH',
        body: formdata,
      }),
      invalidatesTags: ['cards'],
    }),

    deleteCard: builder.mutation<void, Card['id']>({
      query: id => ({
        url: `cards/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, getState, queryFulfilled }) {
        const state = getState() as RootState
        const paramsState = state.cards
        const orderBy = paramsState.orderBy
          ? `${paramsState.orderBy.key}-${paramsState.orderBy.direction}`
          : undefined

        if (state.cards.id) {
          const patchResult = dispatch(
            decksApi.util.updateQueryData(
              'retriveCardsInDeck',
              { ...paramsState, id: state.cards.id, orderBy },
              draft => {
                draft.items = draft.items.filter(card => card.id !== id)
              }
            )
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        }
      },
      invalidatesTags: ['cards'],
    }),
  }),
})

export const { useDeleteCardMutation, useGetCardQuery, useUpdateCardMutation } = cardsApi
