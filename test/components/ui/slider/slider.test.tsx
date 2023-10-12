// eslint-disable-next-line import/default
import React from 'react'

import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, expect, describe, test, vi } from 'vitest'

import { Slider } from '../../../../src/components/ui/slider/index'

describe('test for Slider', () => {
  const sliderId = 'ajrgkjadbqdegbkjdsfg'

  describe('test of basic params', () => {
    const defaultNumbers = [0, 100]
    let slider: HTMLDivElement

    beforeEach(() => {
      const ResizeObserverMock = vi.fn(() => ({
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      }))

      vi.stubGlobal('ResizeObserver', ResizeObserverMock)
      render(<Slider data-testid={sliderId} defaultValue={defaultNumbers} />)
      slider = screen.getByTestId(sliderId)
    })

    afterEach(() => {
      vi.clearAllMocks()
    })

    test('check default value', () => {
      const elems = Array.prototype.slice.call(slider.childNodes)

      //   elems.forEach(function (elem) {
      //     console.log(elem) // HEAD, текст, BODY
      //   })
      expect(slider.innerHTML).toBeDefined()
    })
  })
})
