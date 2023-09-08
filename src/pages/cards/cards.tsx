import { useEffect, useState } from 'react'

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
import { DropDownMenu, DropDownMenuIcon } from '../../components/ui/drop-down-menu'
import { Input } from '../../components/ui/Input'
import { Modal, ModalContentText, ModalFooter } from '../../components/ui/modal'
import { Pagination } from '../../components/ui/pagination'
import { StarRating } from '../../components/ui/star'
import { TableBody, TableCell, TableRoot, TableRow } from '../../components/ui/table/body'
import { Column, Sort } from '../../components/ui/table/decks/decks-table.stories'
import { TableHeader } from '../../components/ui/table/header'
import { Typography } from '../../components/ui/Typography'
import { PATH } from '../../routes'
import { useAuthMeQuery } from '../../services/auth'
import { useActions } from '../../services/common/useActions'
import {
  useCreateCardMutation,
  useDeleteDeckMutation,
  useGetDeckQuery,
  useRetriveCardsInDeckQuery,
  useUpdateDeckMutation,
} from '../../services/decks'
import { formatDate } from '../../utils'
import { useDebounce } from '../../utils/hooks'
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
  const navigate = useNavigate()
  const id = useAppSelector(selectorDeckId)
  const question = useAppSelector(selectorCardsQuestion)
  const answer = useAppSelector(selectorCardsAnswer)
  const orderBy = useAppSelector(selectorCardsOrderBy)
  const currentPage = useAppSelector(selectorCardsCurrentPage)
  const itemsPerPage = useAppSelector(selectorCardsItemsPerPage)

  const questionDebounce = useDebounce(question, 800)

  const { updateQuestion, updateId, updateOrderBy, updateCurrentPage, updateItemsPerPage } =
    useActions(cardsActions)

  const { data: authData } = useAuthMeQuery()

  const { data: deckData, isLoading: isDeckFetching } = useGetDeckQuery({ id: id ?? '' }, { skip })
  const [updateDeck] = useUpdateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()
  const [createCard] = useCreateCardMutation()
  const { data, isLoading: isCardsDeckFetching } = useRetriveCardsInDeckQuery(
    {
      id: id ?? '',
      question: questionDebounce,
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

  const isHaveCards = deckData?.cardsCount
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
    if (data?.cover[0]) newFormData.append('cover', data.cover[0])
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

    const newFormData = new FormData()

    if (data?.question) newFormData.append('question', data.question)
    if (data?.questionImg?.[0]) newFormData.append('questionImg', data.questionImg[0])
    // if (data?.questionVideo) newFormData.append('questionImg', data.questionVideo[0])
    if (data?.answer) newFormData.append('answer', data.answer)
    if (data?.answerImg?.[0]) newFormData.append('answerImg', data.answerImg[0])
    // if (data?.answerVideo) newFormData.append('answerVideo', data.answerVideo[0])
    const newFormDataLength = Array.from(newFormData.entries(), ([key, prop]) => ({
      [key]: {
        ContentLength: typeof prop === 'string' ? prop.length : prop.size,
      },
    }))

    if (newFormDataLength.length && deckId) {
      createCard({ id: deckId, formdata: newFormData })
        .unwrap()
        .then(() => {
          setOpenModal(null)
        })
        .catch(() => alert('Error'))
    }
  }

  const onChangeItemsPerPage = (itemPerPage: number) => {
    updateItemsPerPage(itemPerPage.toString())
  }
  const onChangePage = (page: number) => {
    updateCurrentPage(page.toString())
  }

  const deleteDeckSubmitHandler = (deckId: string) => () => {
    deleteDeck(deckId)
      .unwrap()
      .then(() => {
        alert('deck was deleted')
        navigate(PATH.DECKS)
      })
      .catch(() => {})
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
        {openModal === 'Delete Deck' && deckData && (
          <>
            <ModalContentText>
              Do you really want to remove deck: <b>{deckData?.name}?</b>
              <Typography variant="body2">All cards will be deleted.</Typography>
            </ModalContentText>
            <ModalFooter>
              <Button onClick={deleteDeckSubmitHandler(deckData?.id)}>Delete Deck</Button>
              <Button variant="secondary" onClick={() => setOpenModal(null)}>
                Cancel
              </Button>
            </ModalFooter>
          </>
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
      {!deckData?.cardsCount && isUserDeck && (
        <div className={style.emptyTableContainer}>
          <Typography variant="body2">
            This deck is empty. Click add new card to fill this deck
          </Typography>
          <div className={style.emptyButtonContainer}>
            <Button onClick={addNewCardClickHandler}>{'Add New Card'}</Button>
          </div>
        </div>
      )}
      {!deckData?.cardsCount && !isUserDeck && (
        <div className={style.emptyTableContainer}>
          <Typography variant="body2">This deck is empty.</Typography>
        </div>
      )}
      {!!isHaveCards && (
        <>
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
        </>
      )}
      {!!isHaveCards && (
        <div className={style.paginationContainer}>
          <Pagination
            perPageOptions={[10, 20, 30, 50, 100]}
            count={data?.pagination?.totalItems ?? 0}
            onChange={onChangePage}
            onPerPageChange={onChangeItemsPerPage}
            page={currentPage ? +currentPage : 1}
            defaultValue={itemsPerPage ? +itemsPerPage : undefined}
          />
        </div>
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
