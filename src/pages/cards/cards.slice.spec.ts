import { describe, expect, it } from 'vitest'

import { useAppSelector } from '../../app/store'

import { cardsActions, cardsReducer } from '.'

// extends Vitest's expect method with methods from react-testing-library

describe('cardsReducer', () => {
  it('should update the id', () => {
    const initialState = {
      id: undefined,
      question: undefined,
      answer: undefined,
      orderBy: null,
      currentPage: '1',
      itemsPerPage: '50',
    }

    const newState = cardsReducer(initialState, cardsActions.updateId('123'))

    expect(newState.id).toBe('123')
  })

  it('should update the question', () => {
    const initialState = {
      id: undefined,
      question: undefined,
      answer: undefined,
      orderBy: null,
      currentPage: '1',
      itemsPerPage: '50',
    }

    const newState = cardsReducer(
      initialState,
      cardsActions.updateQuestion('What is your favorite color?')
    )

    expect(newState.question).toBe('What is your favorite color?')
  })

  it('should update the answer', () => {
    const initialState = {
      id: undefined,
      question: undefined,
      answer: undefined,
      orderBy: null,
      currentPage: '1',
      itemsPerPage: '50',
    }

    const newState = cardsReducer(initialState, cardsActions.updateAnswer('Blue'))

    expect(newState.answer).toBe('Blue')
  })

  it('should update the orderBy', () => {
    const initialState = {
      id: undefined,
      question: undefined,
      answer: undefined,
      orderBy: null,
      currentPage: '1',
      itemsPerPage: '50',
    }

    const orderByEntry = 'Cards'
    const direction = 'asc'
    const newState = cardsReducer(
      initialState,
      cardsActions.updateOrderBy({ key: orderByEntry, direction })
    )

    expect(newState.orderBy?.key).toBe(orderByEntry)
    expect(newState.orderBy?.direction).toBe(direction)
  })

  it('should update the currentPage', () => {
    const initialState = {
      id: undefined,
      question: undefined,
      answer: undefined,
      orderBy: null,
      currentPage: '1',
      itemsPerPage: '50',
    }

    const newState = cardsReducer(initialState, cardsActions.updateCurrentPage('2'))

    expect(newState.currentPage).toBe('2')
  })

  it('should update the itemsPerPage', () => {
    const initialState = {
      id: undefined,
      question: undefined,
      answer: undefined,
      orderBy: null,
      currentPage: '1',
      itemsPerPage: '50',
    }

    const newState = cardsReducer(initialState, cardsActions.updateItemsPerPage('20'))

    expect(newState.itemsPerPage).toBe('20')
  })
})
