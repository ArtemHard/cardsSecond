import { ChangeEvent, useEffect, useState } from 'react'

import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  QueryDefinition,
} from '@reduxjs/toolkit/dist/query'
import { LazyQueryTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks'

import { TrashOutline } from '../../../assets/icons'
import { Profile } from '../../../services/auth'
import { Decks, GetDeckParams, useCreateDeckMutation } from '../../../services/decks'
import { useDebounce } from '../../../utils/hooks'
import Button from '../../ui/button/button'
import { Input } from '../../ui/Input'
import { Modal } from '../../ui/modal'
import { Slider } from '../../ui/slider'
import { TabSwither } from '../../ui/tab-switcher'
import { Sort } from '../../ui/table/decks/decks-table.stories'
import { TableHeaderProps } from '../../ui/table/header'
import { Typography } from '../../ui/Typography'

import { DeckModal } from './create-deck-form'
import style from './decks-filter.module.scss'

import { FormValuesCreateDeck } from '.'

const swithButtonsParams = [
  { label: 'My Cards', value: 'My Decks' },
  { label: 'All Cards', value: 'All Decks' },
]

type DecksFilterProps = Pick<TableHeaderProps, 'sort'> & {
  getDecks: LazyQueryTrigger<
    QueryDefinition<
      GetDeckParams,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      'me' | 'Decks',
      Decks,
      'baseApi'
    >
  >
  data?: Decks
  onSort: (data: Sort) => void
  userData: Profile | null | undefined
}
export const DecksFilter = ({ sort, getDecks, onSort, data, userData }: DecksFilterProps) => {
  const [createDeck] = useCreateDeckMutation()
  const [search, setSearch] = useState('')
  const [showAllDeck, setShowAllDeck] = useState(true)
  const [range, setRange] = useState([0, 100])
  const [rangeValue, setRangeValue] = useState([0, 100])
  const [isOpenModal, setIsOpenModal] = useState(false)
  // const getDecksParams = {
  //   itemsPerPage: 100,
  //   minCardsCount: range[0],
  //   maxCardsCount: range[1],
  //   name: search,
  //   authorId: showAllDeck ? '' : userData?.id,
  //   orderBy: sort ? `${sort.key}-${sort.direction}` : '',
  // }
  const debouncedSearch = useDebounce(search, 800)
  const debouncedRange = useDebounce(range, 1200)

  useEffect(() => {
    getDecks({
      itemsPerPage: 100,
      minCardsCount: debouncedRange[0],
      maxCardsCount: debouncedRange[1],
      name: debouncedSearch,
      authorId: showAllDeck ? '' : userData?.id,
      orderBy: sort ? `${sort.key}-${sort.direction}` : '',
    })
  }, [debouncedRange, debouncedSearch, showAllDeck, sort])

  useEffect(() => {
    if (rangeValue[1] !== data?.maxCardsCount && data?.maxCardsCount) {
      setRangeValue(prev => [
        prev[0],
        prev[1] <= data?.maxCardsCount ? prev[1] : data.maxCardsCount,
      ])
    }
  }, [data])

  const onChangeSearchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value)
  }
  const onClearSearchHandler = () => {
    setSearch('')
  }

  const clearFilterHandler = () => {
    setSearch('')
    setShowAllDeck(true)
    setRange([0, data?.maxCardsCount ?? 100])
    setRangeValue([0, data?.maxCardsCount ?? 100])
    onSort(null)
  }

  const onValueChangeTabSwither = (value: string) => {
    switch (value) {
      case swithButtonsParams[0].value:
        setShowAllDeck(false)
        break
      case swithButtonsParams[1].value:
        setShowAllDeck(true)
        break
      default:
        setShowAllDeck(false)
    }
  }

  const onOpenChangeModal = (open: boolean) => {
    setIsOpenModal(open)
  }

  const onSubmitModalHandler = (data: FormValuesCreateDeck) => {
    const newFormData = new FormData()

    newFormData.append('name', data.name)
    if (data?.cover) newFormData.append('cover', data.cover[0])
    if (data?.isPrivate) newFormData.append('isPrivate', JSON.stringify(data.isPrivate))

    createDeck(newFormData)
      .unwrap()
      .then(() => {
        setIsOpenModal(false)
      })
  }

  return (
    <>
      <div className={style.title__container}>
        <Typography variant="large">Decks list</Typography>
        <Button onClick={() => setIsOpenModal(true)}>Add New Deck</Button>
      </div>
      <Modal title="Add New Deck" open={isOpenModal} onOpenChange={onOpenChangeModal}>
        <DeckModal
          onSubmit={onSubmitModalHandler}
          setIsOpenModal={setIsOpenModal}
          submitTextButton="Create Deck"
        />
      </Modal>
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
            onValueChange={onValueChangeTabSwither}
            defaultValue={swithButtonsParams[1].value}
          />
        </div>
        <div className={style.paramWrapper}>
          <Typography as="span" variant="body2">
            Number of cards
          </Typography>
          <div style={{ minWidth: '16rem' }}>
            <Slider
              onValueCommit={setRange}
              value={rangeValue}
              onValueChange={setRangeValue}
              max={data?.maxCardsCount}
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
