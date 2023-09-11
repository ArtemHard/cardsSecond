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
import { CardModalLayout } from '../../components/layout/Header/Modal'
import { Loader } from '../../components/loader'
import Button from '../../components/ui/button/button'
import { DropDownMenu, DropDownMenuIcon } from '../../components/ui/drop-down-menu'
import { Input } from '../../components/ui/Input'
import { Modal } from '../../components/ui/modal'
import { Pagination } from '../../components/ui/pagination'
import { StarRating } from '../../components/ui/star'
import { TableBody, TableCell, TableRoot, TableRow } from '../../components/ui/table/body'
import { Column, Sort } from '../../components/ui/table/decks/decks-table.stories'
import { TableHeader } from '../../components/ui/table/header'
import { Typography } from '../../components/ui/Typography'
import { PATH } from '../../routes'
import { useAuthMeQuery } from '../../services/auth'
import { useActions } from '../../services/common/useActions'
import { CardType, useGetDeckQuery, useRetriveCardsInDeckQuery } from '../../services/decks'
import { cutStringParams, formatDate } from '../../utils'
import { useDebounce } from '../../utils/hooks'
import { buttonActionStyle, ImageCard } from '../decks'

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
  const [currentEditCardData, setCurrentEditCardData] = useState<CardType | undefined>(undefined)
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

  const { data: authData, isLoading: authMeLoading } = useAuthMeQuery()

  const { data: deckData, isLoading: isDeckFetching } = useGetDeckQuery({ id: id ?? '' }, { skip })

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

  if (isCardsDeckFetching || isDeckFetching || authMeLoading) return <Loader />

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
    navigate(cutStringParams(PATH.LEARN) + deckId)
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

  const onChangeItemsPerPage = (itemPerPage: number) => {
    updateItemsPerPage(itemPerPage.toString())
  }
  const onChangePage = (page: number) => {
    updateCurrentPage(page.toString())
  }

  const learnPackHandler = () => {
    if (id) return navigate(cutStringParams(PATH.LEARN) + deckId)
    else alert("don't have useParams")
  }

  return (
    <>
      <Modal title={openModal ?? ''} onOpenChange={ModalChangeType(openModal)} open={!!openModal}>
        <CardModalLayout
          setOpenModal={setOpenModal}
          deckData={deckData}
          modalType={openModal}
          cardData={currentEditCardData}
          deckId={id}
        />
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
                <DropDownMenuIcon
                  icon={<PlayCircleOutlineSvg />}
                  disabled={!isHaveCards}
                  onClick={learnPackHandler}
                >
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
                const { question, answer, updated, grade, id, questionImg, answerImg } = card

                return (
                  <TableRow key={id}>
                    <TableCell className={style.cellQuestion}>
                      {questionImg ? (
                        <ImageCard
                          src={questionImg ?? deckBrokenImg}
                          alt="card question"
                          className={style.cardImgQuestion}
                        />
                      ) : (
                        question
                      )}
                    </TableCell>
                    <TableCell>
                      {questionImg ? (
                        <ImageCard
                          src={answerImg ?? deckBrokenImg}
                          alt="card answer"
                          className={style.cardImgQuestion}
                        />
                      ) : (
                        answer
                      )}
                    </TableCell>
                    <TableCell>{formatDate(updated)}</TableCell>
                    <TableCell>
                      <StarRating rating={grade} setLengthRating={5} />
                    </TableCell>
                    {isUserDeck && (
                      <TableCell align="right">
                        <button
                          style={buttonActionStyle(isUserDeck)}
                          disabled={!isUserDeck}
                          onClick={() => {
                            setCurrentEditCardData(card)
                            setOpenModal('Edit Card')
                          }}
                        >
                          <EditPenSvg />
                        </button>
                        <button
                          style={buttonActionStyle(isUserDeck)}
                          disabled={!isUserDeck}
                          onClick={() => {
                            setCurrentEditCardData(card)
                            setOpenModal('Delete Card')
                          }}
                        >
                          <TrashOutline />
                        </button>
                      </TableCell>
                    )}
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
  | null
