import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { Sort } from '../../components/ui/table/decks/decks-table.stories'

type initialStateType = {
  id?: string
  question?: string
  answer?: string
  orderBy?: Sort
  currentPage?: string
  itemsPerPage?: string
}

const initialState: initialStateType = {
  id: undefined,
  question: undefined,
  answer: undefined,
  orderBy: null,
  currentPage: '1',
  itemsPerPage: '50',
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    updateId(state, action: PayloadAction<string | undefined>) {
      state.id = action.payload
    },
    updateQuestion(state, action: PayloadAction<string | undefined>) {
      state.question = action.payload
    },
    updateAnswer(state, action: PayloadAction<string | undefined>) {
      state.answer = action.payload
    },
    updateOrderBy(state, action: PayloadAction<Sort>) {
      state.orderBy = action.payload
    },
    updateCurrentPage(state, action: PayloadAction<string | undefined>) {
      state.currentPage = action.payload
    },
    updateItemsPerPage(state, action: PayloadAction<string | undefined>) {
      state.itemsPerPage = action.payload
    },
  },
})

export const cardsReducer = cardsSlice.reducer
export const cardsActions = cardsSlice.actions
