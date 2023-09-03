import { ComponentPropsWithoutRef, useEffect, useState } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'

import { useAppSelector } from '../../app/store'
import { ArrowBackOutline, MoreVerticalOutline } from '../../assets/icons'
import deckBrokenImg from '../../assets/images/reactJS.png'
import Button from '../../components/ui/button/button'
import { ControlledInput } from '../../components/ui/controlled/controlled-input'
import { Input } from '../../components/ui/Input'
import { StarRating } from '../../components/ui/star'
import { TableBody, TableCell, TableRoot, TableRow } from '../../components/ui/table/body'
import { Column, Sort } from '../../components/ui/table/decks/decks-table.stories'
import { TableHeader } from '../../components/ui/table/header'
import { Typography } from '../../components/ui/Typography'
import { PATH } from '../../routes'
import { useAuthMeQuery } from '../../services/auth'
import { useActions } from '../../services/common/useActions'
import { useGetDeckQuery, useRetriveCardsInDeckQuery } from '../../services/decks'
import { formatDate } from '../../utils'
import { ImageCard } from '../decks'

import style from './cards.module.scss'

import {
  cardsActions,
  selectorCardsAnswer,
  selectorCardsCurrentPage,
  selectorCardsItemsPerPage,
  selectorCardsOrderBy,
  selectorCardsQuestion,
  selectorDeckId,
} from '.'

export const Cards = () => {
  const { deckId } = useParams()
  const [skip, setSkip] = useState(true)
  //   const navigate = useNavigate()
  const id = useAppSelector(selectorDeckId)
  const question = useAppSelector(selectorCardsQuestion)
  const answer = useAppSelector(selectorCardsAnswer)
  const orderBy = useAppSelector(selectorCardsOrderBy)
  const currentPage = useAppSelector(selectorCardsCurrentPage)
  const itemsPerPage = useAppSelector(selectorCardsItemsPerPage)

  const { updateQuestion, updateId, updateOrderBy } = useActions(cardsActions)

  const { data: authData } = useAuthMeQuery()

  const { data: deckData, isLoading: isDeckFetching } = useGetDeckQuery({ id: id ?? '' }, { skip })

  const { data, isLoading: isCardsDeckFetching } = useRetriveCardsInDeckQuery(
    {
      id: id ?? '',
      question,
      answer,
      orderBy: orderBy ? `${orderBy.key}-${orderBy.direction}` : undefined,
      currentPage,
      itemsPerPage,
    },
    { skip }
  )

  useEffect(() => {
    if (deckId) {
      updateId(deckId)
      setSkip(false)
    } else updateId(undefined)
  }, [deckId])

  if (isCardsDeckFetching || isDeckFetching) return <div>loading...</div>

  if (!id) return <div>Deck not found</div>

  const isUserDeck = authData?.id === deckData?.author?.id

  const addNewCardClickHandler = () => {
    alert('open modal logic')
  }

  const learnDeckClickHandler = () => {
    alert('learn logic')
  }

  const searchCardOnValueChange = (value: string) => {
    updateQuestion(value)
  }
  const searchCardReset = () => {
    updateQuestion('')
  }
  const onSort = (data: Sort) => {
    updateOrderBy(data)
  }
  const columnsActionDelete = () => {
    if (isUserDeck) return columns
    else return columns.filter(el => el.key !== 'actions')
  }

  return (
    <>
      <section className={style.backNavigateContainer}>
        <Button as={Link} variant="link" to={PATH.DECKS} className={style.backButton}>
          <ArrowBackOutline className={style.BackOutline} />
          <Typography variant="body2">Back to Packs List</Typography>
        </Button>
      </section>
      <section className={style.paramsWrapper}>
        <div className={style.titleContainer}>
          <div className={style.deckName}>
            <Typography variant="large">{deckData?.name}</Typography>
            <MoreVerticalOutline />
          </div>
          <Button onClick={isUserDeck ? addNewCardClickHandler : learnDeckClickHandler}>
            {isUserDeck ? 'Add New Card' : 'Learn Pack'}
          </Button>
        </div>
        <ImageCard src={deckData?.cover ?? deckBrokenImg} className={style.deckCover}></ImageCard>
        <Input
          type="search"
          placeholder="Input search"
          onValueChange={searchCardOnValueChange}
          onClearInput={searchCardReset}
          value={question}
          className={style.searchInput}
        />
      </section>
      {!!data?.items.length && (
        <TableRoot className={style.rootTable}>
          <TableHeader columns={columnsActionDelete()} onSort={onSort} sort={orderBy ?? null} />
          <TableBody>
            {data?.items.map(card => {
              const { question, answer, updated, rating, id, deckId } = card

              return (
                <TableRow key={id}>
                  <TableCell className={style.cellQuestion}>{question}</TableCell>
                  <TableCell>{answer}</TableCell>
                  <TableCell>{formatDate(updated)}</TableCell>
                  <TableCell align="left">
                    <StarRating rating={rating} setLengthRating={5} />
                  </TableCell>
                  {isUserDeck && <TableCell>ACTIONS</TableCell>}
                </TableRow>
              )
            })}
          </TableBody>
        </TableRoot>
      )}
    </>
  )
}

const columns: Column[] = [
  { key: 'question', isSortable: true, title: 'Question' },
  { key: 'answer', isSortable: true, title: 'Answer' },
  { key: 'updated', isSortable: true, title: 'Last Updated' },
  { key: 'grade', isSortable: true, title: 'Grade' },
  { key: 'actions', isSortable: false, title: '' },
]
