// eslint-disable-next-line import/default
import React from 'react'

import { RenderResult, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { Input } from '../../../../src/components/ui/Input/index'

describe('test of input', () => {
  const inputTestId = 'kjhgkjhgkjhgkjhgkjgh'

  describe('test of basic params', () => {
    const inputValue = 'test'
    const onChangeInput = vi.fn()
    const onHoverInput = vi.fn()
    const onBlurInput = vi.fn()
    let input: HTMLInputElement

    beforeEach(() => {
      render(
        <Input
          data-testid={inputTestId}
          value={inputValue}
          onValueChange={onChangeInput}
          onMouseEnter={onHoverInput}
          onMouseLeave={onBlurInput}
        />
      )
      input = screen.getByTestId(inputTestId)
    })

    afterEach(() => {
      vi.clearAllMocks()
    })

    test('check default value', () => {
      expect(input.value).toBe(inputValue)
    })

    test('user change data - called onChange callback', async () => {
      await userEvent.type(input, 'abc')
      expect(onChangeInput).toBeCalledWith('testa')
      expect(onChangeInput).toBeCalledWith('testb')
      expect(onChangeInput).toBeCalledWith('testc')
    })

    test('Input use html tag input', () => {
      expect(input.tagName).toBe('INPUT')
    })

    test('hover event trigger onMuseEnter event', async () => {
      await userEvent.hover(input)
      // expect(onHoverInput).toBeCalledTimes(2) // called 2 times in userEvent by default
      expect(onHoverInput).toBeCalled()
      expect(onBlurInput).not.toBeCalled()

      await userEvent.unhover(input)
      expect(onBlurInput).toBeCalled()
    })
  })

  describe('Entry value will be shown', () => {
    let inputValue = ''
    const checkingValue = 'A'
    let onChangeInput = vi.fn((value: string) => (inputValue = checkingValue))
    let input: HTMLInputElement
    let rerenderOption: RenderResult

    beforeEach(() => {
      rerenderOption = render(
        <Input data-testid={inputTestId} value={inputValue} onValueChange={onChangeInput} />
      )
      input = screen.getByTestId(inputTestId)
    })

    afterEach(() => {
      vi.clearAllMocks()
    })

    test('entry string for checking that input has been shown', async () => {
      await userEvent.type(input, checkingValue)
      expect(onChangeInput).toBeCalledWith(checkingValue)
      rerenderOption.rerender(
        <Input data-testid={inputTestId} value={inputValue} onValueChange={onChangeInput} />
      )

      expect(input.value).toBe(checkingValue)
    })
  })
})
