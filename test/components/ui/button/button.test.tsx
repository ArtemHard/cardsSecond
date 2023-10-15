// eslint-disable-next-line import/default
import React, { ElementType } from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import Button from '../../../../src/components/ui/button/button'

describe('test of button', () => {
  const btnId = 'ajsgfjaerg743gd'

  describe('test of basic params', () => {
    const textBtn = 'TestBtn'

    const onClick = vi.fn()
    const onHoverInput = vi.fn()
    const onBlurInput = vi.fn()
    let button: HTMLElement

    beforeEach(() => {
      render(
        <Button
          data-testid={btnId}
          onClick={onClick}
          onMouseEnter={onHoverInput}
          onMouseLeave={onBlurInput}
        >
          {textBtn}
        </Button>
      )
      button = screen.getByTestId(btnId)
    })

    afterEach(() => {
      vi.clearAllMocks()
    })
    test('inner button text', () => {
      expect(button.innerHTML).toBe(textBtn)
    })
    test('Button use html tag button', () => {
      expect(button.tagName).toBe('BUTTON')
    })
    test('func has been triggered', async () => {
      await userEvent.click(button)
      expect(onClick).toBeCalled()

      await userEvent.hover(button)
      expect(onHoverInput).toBeCalled()
      expect(onBlurInput).not.toBeCalled()

      await userEvent.unhover(button)
      expect(onBlurInput).toBeCalled()
    })
  })
})
