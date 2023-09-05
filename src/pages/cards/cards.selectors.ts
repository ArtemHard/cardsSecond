import { RootState } from '../../app/store'

export const selectorDeckId = (state: RootState) => {
  return state.cards.id
}
export const selectorCardsQuestion = (state: RootState) => {
  return state.cards.question
}
export const selectorCardsAnswer = (state: RootState) => {
  return state.cards.answer
}
export const selectorCardsOrderBy = (state: RootState) => {
  return state.cards.orderBy
}
export const selectorCardsCurrentPage = (state: RootState) => {
  return state.cards.currentPage
}
export const selectorCardsItemsPerPage = (state: RootState) => {
  return state.cards.itemsPerPage
}
