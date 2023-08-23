import { baseApi } from '../common/base-api'

import type {
  Card,
  CreateDeckArgs,
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
    }),
    getDeck: builder.query<Decks, DeckId>({
      query: ({ id }) => ({
        url: 'decks/' + id,
      }),
    }),
    createDeck: builder.mutation<Deck, FormData>({
      query: args => ({
        url: 'decks',
        method: 'POST',
        // headers: {
        //   'Content-Type': 'multipart/form-data;',
        // },
        body: args,
      }),
    }),
    updateDeck: builder.mutation<Deck, DeckId & FormData>({
      query: ({ id, ...bodyData }) => ({
        url: `decks/${id}`,
        method: 'PATCH',
        // headers: {
        //   'Content-Type': 'multipart/form-data;',
        // },
        body: bodyData,
      }),
    }),
    deleteDeck: builder.mutation<Omit<Deck, 'author'>, DeckId>({
      query: ({ id }) => ({
        url: `decks/${id}`,
        method: 'DELETE',
      }),
    }),
    retriveCardsInDeck: builder.query<
      Omit<Decks, 'maxCardsCount'>,
      DeckId & RetriveCardsInDeckParams
    >({
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

export const { useGetDecksListQuery } = decksApi
