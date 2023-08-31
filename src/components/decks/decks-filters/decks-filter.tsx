import { ChangeEvent, useEffect, useState } from 'react'

import { DevTool } from '@hookform/devtools'

import { ImageSvg, TrashOutline } from '../../../assets/icons'
import deckImg from '../../../assets/images/reactJS.png'
import { useAuthMeQuery } from '../../../services/auth'
import { useCreateDeckMutation, useGetDecksListQuery } from '../../../services/decks'
import Button from '../../ui/button/button'
import { ControlledCheckbox } from '../../ui/controlled/controlled-checkbox'
import { ControlledInput } from '../../ui/controlled/controlled-input'
import { Input } from '../../ui/Input'
import { Modal, ModalFooter } from '../../ui/modal'
import { Slider } from '../../ui/slider'
import { TabSwither } from '../../ui/tab-switcher'
import { Typography } from '../../ui/Typography'

import style from './decks-filter.module.scss'

import { FormValuesCreateDeck, useAddDeckForm } from '.'

const swithButtonsParams = [
  { label: 'My Cards', value: 'My Decks' },
  { label: 'All Cards', value: 'All Decks' },
]

export const DecksFilter = () => {
  const { data: userData } = useAuthMeQuery()
  const [createDeck] = useCreateDeckMutation()
  const [search, setSearch] = useState('')
  const [showAllDeck, setShowAllDeck] = useState(true)
  const [range, setRange] = useState([0, 100])
  const [rangeValue, setRangeValue] = useState([0, 100])
  const [isOpenModal, setIsOpenModal] = useState(false)
  const getDecksParams = {
    itemsPerPage: 100,
    minCardsCount: range[0],
    maxCardsCount: range[1],
    name: search,
    authorId: showAllDeck ? '' : userData?.id,
  }

  const { data } = useGetDecksListQuery(getDecksParams, { refetchOnMountOrArgChange: true })

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
    if (data?.cover) newFormData.append('cover', data.cover)
    if (data?.isPrivate) newFormData.append('isPrivate', JSON.stringify(data.isPrivate))

    createDeck(newFormData)
      .unwrap()
      .then(() => {
        setIsOpenModal(false)
      })
  }

  const { handleSubmit, register, control } = useAddDeckForm({ onSubmit: onSubmitModalHandler })

  return (
    <>
      <div className={style.title__container}>
        <Typography variant="large">Decks list</Typography>
        <Button onClick={() => setIsOpenModal(true)}>Add New Deck</Button>
      </div>
      <Modal title="Add New Deck" open={isOpenModal} onOpenChange={onOpenChangeModal}>
        <form onSubmit={handleSubmit}>
          <DevTool control={control} />
          <img src={deckImg} className={style.deckImg}></img>
          <Button as="label" variant="secondary" fullWidth={true} className={style.addCoverBtn}>
            <ImageSvg />
            <Typography variant="subtitle2" as="span">
              Change Cover
            </Typography>
            <input type="file" {...register('cover')} style={{ display: 'none' }} />
          </Button>
          <ControlledInput
            control={control}
            type="text"
            name="name"
            label="Name Pack"
            className={style.packNameInput}
          />
          <ControlledCheckbox
            control={control}
            name="isPrivate"
            label={'Private pack'}
            position="left"
            defaultValue={false}
            className={style.isPrivate}
          />
          <ModalFooter>
            <Button variant={'primary'} type="submit">
              Create Deck
            </Button>
            <Button variant={'secondary'} type="submit" onClick={() => setIsOpenModal(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
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
