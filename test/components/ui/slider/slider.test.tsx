// eslint-disable-next-line import/default
import React from 'react'

import { RenderResult, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, expect, describe, test, vi, it } from 'vitest'

import { Slider } from '../../../../src/components/ui/slider/index'

describe('test of basic params', () => {
  const sliderId = 'ajrgkjadbqdegbkjdsfg'
  const defaultNumbers = [0, 12]
  let slider: HTMLDivElement

  beforeEach(() => {
    const ResizeObserverMock = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }))

    vi.stubGlobal('ResizeObserver', ResizeObserverMock)
    render(<Slider data-testid={sliderId} defaultValue={defaultNumbers} value={defaultNumbers} />)
    slider = screen.getByTestId(sliderId)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  test('check default value', () => {
    const minValueElement = screen.getByLabelText('minValue').innerHTML
    const maxValueElement = screen.getByLabelText('maxValue').innerHTML

    expect(minValueElement).toBe(defaultNumbers[0].toString())
    expect(maxValueElement).toBe(defaultNumbers[1].toString())
    expect(slider.innerHTML).toBeDefined()
  })

  it('snap shot mathes', () => {
    const wrapper = render(<Slider />)

    expect(wrapper).toMatchSnapshot()
  })
})
