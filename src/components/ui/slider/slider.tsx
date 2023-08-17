import { forwardRef } from 'react'

import * as RadixSlider from '@radix-ui/react-slider'

import { Typography } from '../Typography'

import style from './slider.module.scss'

export const Slider = forwardRef<HTMLSpanElement, RadixSlider.SliderProps>((props, ref) => {
  return (
    <div className={style.SliderWrapper}>
      <div className={style.cardNumber}>
        <Typography
          aria-label="minValue"
          variant="body1"
          as="span"
          style={{ position: 'absolute' }}
        >
          {props?.value?.[0]}
        </Typography>
      </div>
      <RadixSlider.Root
        defaultValue={props.value}
        minStepsBetweenThumbs={1}
        className={style.SliderRoot}
        onValueChange={props.onValueChange}
        onValueCommit={props.onValueCommit}
        max={props.max ?? 100}
        min={props.min ?? 0}
        ref={ref}
      >
        <RadixSlider.Track className={style.SliderTrack}>
          <RadixSlider.Range className={style.SliderRange} />
        </RadixSlider.Track>
        <RadixSlider.Thumb key={1} className={style.SliderThumb} />
        <RadixSlider.Thumb key={2} className={style.SliderThumb} />
      </RadixSlider.Root>
      <div className={style.cardNumber}>
        <Typography
          aria-label="maxValue"
          variant="body1"
          as="span"
          style={{ position: 'absolute' }}
        >
          {props?.value?.[1]}
        </Typography>
      </div>
    </div>
  )
})
