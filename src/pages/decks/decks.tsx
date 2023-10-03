import { ComponentPropsWithoutRef, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { EditPenSvg, PlayCircleOutlineSvg, TrashOutline } from '../../assets/icons'
import deckImg from '../../assets/images/reactJS.png'
import { DecksFilter } from '../../components/decks/decks-filters/decks-filter'
import { CardModalLayout } from '../../components/layout/Modal'
import { Loader } from '../../components/loader'
import { Modal } from '../../components/ui/modal'
import { Pagination } from '../../components/ui/pagination'
import { TableBody, TableCell, TableRoot, TableRow } from '../../components/ui/table/body'
import { Column, Sort } from '../../components/ui/table/decks/decks-table.stories'
import { TableHeader } from '../../components/ui/table/header'
import { Typography } from '../../components/ui/Typography'
import { PATH } from '../../routes'
import { useAuthMeQuery } from '../../services/auth'
import { Deck, useLazyGetDecksListQuery } from '../../services/decks'
import { cutStringParams, formatDate } from '../../utils'
import { ModalsCardsVariant } from '../cards'

import style from './decks.style.module.scss'

const columns: Column[] = [
  {
    key: 'name',
    title: 'Name',
    isSortable: true,
  },
  {
    key: 'cardsCount',
    title: 'Cards',
    isSortable: true,
  },
  {
    key: 'updated',
    title: 'Last Updated',
    isSortable: true,
  },
  {
    key: 'author.name',
    title: 'Author',
    isSortable: true,
  },
  {
    key: 'actions',
    title: '',
  },
]

export const Decks = () => {
  const [sort, setSort] = useState<Sort>(null)
  const [openModal, setOpenModal] = useState<ModalsCardsVariant | null>(null)
  const [deckData, setDeckData] = useState<Deck | null>(null)

  const [perPage, setPerPage] = useState(50)
  const [page, setPage] = useState(1)
  const [getDecks, { data }] = useLazyGetDecksListQuery()
  const { data: userData, isLoading } = useAuthMeQuery()
  const navigate = useNavigate()

  const learnPackHandler = (deckId: string) => () => {
    navigate(/learn/ + deckId)
  }

  const deleteDeckHandler = (deck: Deck) => () => {
    setOpenModal('Delete Deck')
    setDeckData(deck)
  }

  const ModalChangeType = (value: ModalsCardsVariant | null) => (open: boolean) => {
    open ? setOpenModal(value) : setOpenModal(null)
  }

  if (isLoading) return <Loader />

  return (
    <>
      <DecksFilter
        sort={sort}
        getDecks={getDecks}
        data={data}
        userData={userData}
        onSort={setSort}
        perPage={perPage}
        page={page}
      />
      <Modal title={openModal ?? ''} onOpenChange={ModalChangeType(openModal)} open={!!openModal}>
        <CardModalLayout
          setOpenModal={setOpenModal}
          modalType={openModal}
          deckData={deckData ?? undefined}
          deckId={deckData?.id ?? ''}
        />
      </Modal>
      <TableRoot className={style.tableRoot}>
        <TableHeader columns={columns} onSort={setSort} sort={sort} className={style.tableHeader} />
        {!!data && (
          <TableBody>
            {data.items.map(deck => {
              const isHaveCrads = deck.cardsCount > 0
              const isMyDeck = deck.author.id === userData?.id

              return (
                <TableRow key={deck.id}>
                  <TableCell>
                    <Link
                      to={cutStringParams(PATH.CARDS) + deck.id}
                      className={style.deckNameContainer}
                    >
                      <ImageCard
                        src={deck.cover ?? deckImg}
                        alt="deck cover"
                        className={style.deckCover}
                      />
                      <Typography variant="body2">{deck.name}</Typography>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{deck.cardsCount}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{formatDate(deck.updated)}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{deck.author.name}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <button
                      style={buttonActionStyle(isHaveCrads)}
                      disabled={!isHaveCrads}
                      onClick={learnPackHandler(deck.id)}
                    >
                      <PlayCircleOutlineSvg />
                    </button>
                    <button
                      style={buttonActionStyle(isMyDeck)}
                      disabled={!isMyDeck}
                      onClick={() => {
                        setOpenModal('Edit Deck')
                        setDeckData(deck)
                      }}
                    >
                      <EditPenSvg />
                    </button>
                    <button
                      style={buttonActionStyle(isMyDeck)}
                      disabled={!isMyDeck}
                      onClick={deleteDeckHandler(deck)}
                    >
                      <TrashOutline />
                    </button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        )}
      </TableRoot>
      {!!data?.items.length && (
        <div className={style.paginationContainer}>
          <Pagination
            perPageOptions={[10, 20, 30, 50, 100]}
            count={data?.pagination.totalPages ?? 0}
            onChange={setPage}
            onPerPageChange={setPerPage}
            page={page}
            defaultValue={perPage}
          />
        </div>
      )}
    </>
  )
}

export const buttonActionStyle = (isActive: boolean) => {
  if (isActive) {
    return { cursor: 'pointer', opacity: 1, marginLeft: '0.62rem' }
  } else
    return {
      cursor: 'default',
      opacity: 0.5,
      marginLeft: '0.62rem',
    }
}

export const ImageCard = (props: ComponentPropsWithoutRef<'img'>) => {
  const [isAvaBroken, setIsAvaBroken] = useState(false)
  const errorHandler = () => {
    setIsAvaBroken(true)
  }

  return <img src={isAvaBroken ? deckImg : props.src} onError={errorHandler} {...props}></img>
}
