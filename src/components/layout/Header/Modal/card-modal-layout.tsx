import { useNavigate } from 'react-router-dom'

import { ModalsCardsVariant } from '../../../../pages/cards'
import { PATH } from '../../../../routes'
import { useDeleteCardMutation, useUpdateCardMutation } from '../../../../services/cards'
import {
  CardType,
  Deck,
  useCreateCardMutation,
  useDeleteDeckMutation,
  useUpdateDeckMutation,
} from '../../../../services/decks'
import { CardFrom, FormValuesCreateCard } from '../../../cards/forms'
import { FormValuesCreateDeck } from '../../../decks/decks-filters'
import { DeckModal } from '../../../decks/decks-filters/create-deck-form'
import Button from '../../../ui/button/button'
import { ModalContentText, ModalFooter } from '../../../ui/modal'
import { Typography } from '../../../ui/Typography'

type CardModalLayoutProps = {
  modalType: ModalsCardsVariant
  setOpenModal: (variants: ModalsCardsVariant) => void
  deckData?: Deck
  cardData?: CardType
  deckId: string
}

export const CardModalLayout = ({
  modalType,
  deckData,
  cardData,
  setOpenModal,
  deckId,
}: CardModalLayoutProps) => {
  const navigate = useNavigate()

  const ModalChangeType = (value: ModalsCardsVariant) => (open: boolean) => {
    open ? setOpenModal(value) : setOpenModal(null)
  }
  const [createCard] = useCreateCardMutation()
  const [updateDeck] = useUpdateDeckMutation()
  const [updateCard] = useUpdateCardMutation()
  const [deleteDeck] = useDeleteDeckMutation()
  const [deleteCard] = useDeleteCardMutation()

  const onSubmitCRUDCard = (data: FormValuesCreateCard) => {
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

    if (newFormDataLength.length && deckId && modalType === 'Add New Card') {
      createCard({ id: deckId, formdata: newFormData })
        .unwrap()
        .then(() => {
          setOpenModal(null)
        })
        .catch(() => alert('Error'))
    }
    if (newFormDataLength.length && cardData?.id && modalType === 'Edit Card') {
      updateCard({ id: cardData?.id, formdata: newFormData })
        .unwrap()
        .then(() => {
          setOpenModal(null)
        })
        .catch(() => alert('Error'))
    }
  }

  if (modalType === 'Add New Card') {
    return (
      <CardFrom
        onSubmit={onSubmitCRUDCard}
        setIsOpenModal={ModalChangeType(modalType)}
        submitTextButton="Add New Card"
      />
    )
  }
  if (modalType === 'Edit Card' && cardData) {
    return (
      <CardFrom
        onSubmit={onSubmitCRUDCard}
        setIsOpenModal={ModalChangeType(modalType)}
        defaultData={cardData}
        submitTextButton="Update Card"
      />
    )
  }

  if (modalType === 'Edit Deck') {
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

    return (
      <DeckModal
        onSubmit={onSubmitUpdateDeck}
        setIsOpenModal={ModalChangeType(modalType)}
        submitTextButton="Update Deck"
        defaultData={deckData}
      />
    )
  }
  if (modalType === 'Delete Deck' && deckData) {
    const deleteDeckSubmitHandler = (deckId: string) => () => {
      deleteDeck(deckId)
        .unwrap()
        .then(() => {
          // setOpenModal(null)
          alert('deck was deleted')
          navigate(PATH.DECKS)
        })
        .catch(() => {})
    }

    return (
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
    )
  }
  if (modalType === 'Delete Card' && cardData) {
    const deleteDeckSubmitHandler = (cardId: string) => () => {
      //optimistic update close modal immidiatley
      setOpenModal(null)
      deleteCard(cardId)
        .unwrap()
        .then(() => {})
        .catch(() => {})
    }

    return (
      <>
        <ModalContentText>
          Do you really want to remove card: <b>{cardData?.question}?</b>
        </ModalContentText>
        <ModalFooter>
          <Button onClick={deleteDeckSubmitHandler(cardData?.id)}>Delete Card</Button>
          <Button variant="secondary" onClick={() => setOpenModal(null)}>
            Cancel
          </Button>
        </ModalFooter>
      </>
    )
  }

  return <div>card-modal-layout</div>
}
