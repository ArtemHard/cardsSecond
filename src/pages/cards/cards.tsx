import { debug } from 'console'

import { ComponentPropsWithoutRef, useEffect, useState } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'

import { useAppSelector } from '../../app/store'
import {
  ArrowBackOutline,
  EditPenSvg,
  MoreVerticalOutline,
  PlayCircleOutlineSvg,
  TrashOutline,
} from '../../assets/icons'
import deckBrokenImg from '../../assets/images/reactJS.png'
import { CardFrom, FormValuesCreateCard } from '../../components/cards/forms'
import {
  DeckModal,
  FormValuesCreateDeck,
} from '../../components/decks/decks-filters/create-deck-form'
import Button from '../../components/ui/button/button'
import { ControlledInput } from '../../components/ui/controlled/controlled-input'
import { DropDownMenu, DropDownMenuIcon } from '../../components/ui/drop-down-menu'
import { Input } from '../../components/ui/Input'
import { Modal } from '../../components/ui/modal'
import { StarRating } from '../../components/ui/star'
import { TableBody, TableCell, TableRoot, TableRow } from '../../components/ui/table/body'
import { Column, Sort } from '../../components/ui/table/decks/decks-table.stories'
import { TableHeader } from '../../components/ui/table/header'
import { Typography } from '../../components/ui/Typography'
import { PATH } from '../../routes'
import { useAuthMeQuery, useUpdateUserMutation } from '../../services/auth'
import { useActions } from '../../services/common/useActions'
import {
  useDeleteDeckMutation,
  useGetDeckQuery,
  useRetriveCardsInDeckQuery,
  useUpdateDeckMutation,
} from '../../services/decks'
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
  const [openModal, setOpenModal] = useState<ModalsCardsVariant | null>(null)
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
  const [updateDeck] = useUpdateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()
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

  const isUserDeck = authData?.id === deckData?.userId

  const isHaveCards = data?.items.length ? data?.items.length > 0 : false
  const addNewCardClickHandler = () => {
    setOpenModal('Add New Card')
  }
  const editDeckClickHandler = () => {
    setOpenModal('Edit Deck')
  }
  const deleteDeckClickHandler = () => {
    setOpenModal('Delete Deck')
  }

  const ModalChangeType = (value: ModalsCardsVariant | null) => (open: boolean) => {
    open ? setOpenModal(value) : setOpenModal(null)
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
  const onSubmitUpdateDeck = (data: FormValuesCreateDeck) => {
    const newFormData = new FormData()

    newFormData.append('name', data.name)
    if (data?.cover) newFormData.append('cover', data.cover[0])
    if (typeof data?.isPrivate === 'boolean')
      newFormData.append('isPrivate', JSON.stringify(data.isPrivate))
    if (deckData?.id) {
      updateDeck({ id: deckData?.id, formdata: newFormData })
        .unwrap()
        .then(() => {
          setOpenModal(null)
        })
    }
  }

  const onSubmitCreateCard = (data: FormValuesCreateCard) => {
    console.log(data)
    setOpenModal(null)
  }

  return (
    <>
      <Modal title={openModal ?? ''} onOpenChange={ModalChangeType(openModal)} open={!!openModal}>
        {openModal === 'Edit Deck' && isUserDeck && (
          <DeckModal
            onSubmit={onSubmitUpdateDeck}
            setIsOpenModal={ModalChangeType(openModal)}
            submitTextButton="Update Deck"
            defaultData={deckData}
          />
        )}
        {openModal === 'Add New Card' && (
          <CardFrom
            onSubmit={onSubmitCreateCard}
            setIsOpenModal={ModalChangeType(openModal)}
            submitTextButton="Add New Card"
          />
        )}
      </Modal>
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
            {isUserDeck && (
              <DropDownMenu trigger={<MoreVerticalOutline />}>
                <DropDownMenuIcon icon={<PlayCircleOutlineSvg />} disabled={!isHaveCards}>
                  Learn
                </DropDownMenuIcon>
                <DropDownMenuIcon icon={<EditPenSvg />} onClick={editDeckClickHandler}>
                  Edit
                </DropDownMenuIcon>
                <DropDownMenuIcon icon={<TrashOutline />} onClick={deleteDeckClickHandler}>
                  Delete
                </DropDownMenuIcon>
              </DropDownMenu>
            )}
          </div>

          {isHaveCards && (
            <Button onClick={isUserDeck ? addNewCardClickHandler : learnDeckClickHandler}>
              {isUserDeck ? 'Add New Card' : 'Learn Pack'}
            </Button>
          )}
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
      {!isHaveCards && isUserDeck && (
        <div className={style.emptyTableContainer}>
          <Typography variant="body2">
            This deck is empty. Click add new card to fill this deck
          </Typography>
          <div className={style.emptyButtonContainer}>
            <Button onClick={addNewCardClickHandler}>{'Add New Card'}</Button>
          </div>
        </div>
      )}
      {isHaveCards && (
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

export type ModalsCardsVariant =
  | 'Edit Card'
  | 'Add New Card'
  | 'Edit Deck'
  | 'Delete Card'
  | 'Delete Deck'
  | 'Add New Deck'
// const generateModalTitle = (type: ModalsCardsVariant) => {
//   switch (type) {
//     case 'addCard':
//       return 'Add New Card'
//     case 'editPack':
//       return 'Edit Pack'
//     case 'editCard':
//       return 'Edit'
//     case 'addCard':
//       return 'Add New Card'

//     default:
//       break
//   }
// }
