import { ChangeEvent, useEffect, useState } from 'react'

import { TrashOutline } from '../../../assets/icons'
import { useGetDecksListQuery } from '../../../services/decks'
import Button from '../../ui/button/button'
import { Input } from '../../ui/Input'
import { Slider } from '../../ui/slider'
import { TabSwither } from '../../ui/tab-switcher'
import { Typography } from '../../ui/Typography'

import style from './decks-filter.module.scss'

const swithButtonsParams = [
  { label: 'My Cards', value: 'My Cards' },
  { label: 'All Cards', value: 'All Cards' },
]

export const DecksFilter = () => {
  const [search, setSearch] = useState('')
  const [showAllDeck, setShowAllDeck] = useState(true)
  const [minCardsCount, setMinCardsCount] = useState(0)
  const [maxCardsCount, setMaxCardsCount] = useState(100)
  // const [range, setRange] = useState([0, 100])
  // const [rangeValue, setRangeValue] = useState([0, 100])
  const getDecksParams = {
    itemsPerPage: 100,
    maxCardsCount,
    minCardsCount,
    name: search,
  }

  console.log(getDecksParams)

  const { data } = useGetDecksListQuery(getDecksParams)

  useEffect(() => {
    if (data?.maxCardsCount) {
      setMaxCardsCount(prev => (maxCardsCount <= data?.maxCardsCount ? prev : data.maxCardsCount))
    }
  }, [data])

  const onChangeSearchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value)
  }
  const onClearSearchHandler = () => {
    setSearch('')
  }
  const onValueChangeSlider = (value: number[]) => {
    setMaxCardsCount(value[1])
    setMinCardsCount(value[0])
  }
  const clearFilterHandler = () => {
    setSearch('')
    setShowAllDeck(true)
    setMinCardsCount(0)
    setMaxCardsCount(data?.maxCardsCount ?? 100)
  }

  console.log([minCardsCount, maxCardsCount])

  return (
    <>
      <div className={style.title__container}>
        <Typography variant="large">Decks list</Typography>
        <Button>Add New Pack</Button>
      </div>
      <div className={style.params__container}>
        <Input
          type="search"
          onChange={onChangeSearchHandler}
          onClearInput={onClearSearchHandler}
          value={search}
        />
        <div className={style.paramWrapper}>
          <Typography as="span" variant="body2">
            Show decks cards
          </Typography>
          <TabSwither
            buttons={swithButtonsParams}
            onValueChange={(value: string) => alert('CHANGE ' + value)}
            defaultValue={'All Cards'}
          />
        </div>
        <div className={style.paramWrapper}>
          <Typography as="span" variant="body2">
            Number of cards
          </Typography>
          <div style={{ minWidth: '16rem' }}>
            <Slider
              max={data?.maxCardsCount ?? 100}
              min={0}
              value={[minCardsCount, maxCardsCount]}
              defaultValue={[minCardsCount, maxCardsCount]}
              onValueCommit={onValueChangeSlider}
              onValueChange={onValueChangeSlider}
            />
          </div>
        </div>
        <div className={style.paramWrapper}>
          <Button variant="secondary" onClick={clearFilterHandler}>
            <TrashOutline />
            <Typography variant="subtitle2" as="span" style={{ margin: 0, padding: 0 }}>
              Clear Filter
            </Typography>
          </Button>
        </div>
      </div>
    </>
  )
}
