import { baseApi } from '../common/base-api'

import type {
  Card,
  CreateDeckArgs,
  Deck,
  Decks,
  GetDeckParams,
  RetriveCardsInDeckParams,
  createCardArgs,
} from './types'

export const decksApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getDecksList: builder.query<Decks, GetDeckParams>({
      query: args => ({
        url: 'decks',
        params: args,
      }),
    }),
    getDeck: builder.query<Decks, { id: string }>({
      query: ({ id }) => ({
        url: 'decks/' + id,
      }),
    }),
    createDeck: builder.mutation<Deck, CreateDeckArgs>({
      query: args => ({
        url: 'decks',
        method: 'POST',
        body: args,
      }),
    }),
    updateDeck: builder.mutation<Deck, { id: string } & Partial<CreateDeckArgs>>({
      query: ({ id, ...bodyData }) => ({
        url: `decks/${id}`,
        method: 'PATCH',
        body: bodyData,
      }),
    }),
    deleteDeck: builder.mutation<Omit<Deck, 'author'>, { id: string }>({
      query: ({ id }) => ({
        url: `decks/${id}`,
        method: 'DELETE',
      }),
    }),
    retriveCardsInDeck: builder.query<
      Omit<Decks, 'maxCardsCount'>,
      { id: string } & RetriveCardsInDeckParams
    >({
      query: ({ id, ...params }) => ({
        url: `decks/${id}/cards`,
        params,
      }),
    }),
    createCard: builder.mutation<Card, { id: string } & createCardArgs>({
      query: ({ id, ...restArgs }) => ({
        url: `decks/${id}/cards`,
        method: 'POST',
        body: restArgs,
      }),
    }),
    retriveRandomCard: builder.query<Card, { id: string; previousCardId?: string }>({
      query: ({ id, ...previousCardId }) => ({
        url: `decks/${id}/learn`,
        params: previousCardId,
      }),
    }),
    saveGradeCard: builder.mutation<unknown, { id: string; cardId: string; grade: number }>({
      query: ({ id, ...restArgs }) => ({
        url: `decks/${id}/cards`,
        method: 'POST',
        body: restArgs,
      }),
    }),
  }),
})
