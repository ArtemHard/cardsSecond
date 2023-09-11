export type Decks = {
  items: Deck[]
  pagination: Pagination
  maxCardsCount: number
}
export type Cards = {
  items: CardType[]
} & Pick<Decks, 'pagination'>

export type Pagination = {
  currentPage: number
  itemsPerPage: number
  totalPages: number
  totalItems: number
}

export type Deck = {
  author: Author
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover: string | null
  rating: number
  created: Date
  updated: Date
  cardsCount: number
}

export type Author = {
  id: string
  name: string
}

export type GetDeckParams = {
  minCardsCount?: number
  maxCardsCount?: number
  name?: string
  authorId?: string
  orderBy?: string
  currentPage?: number
  itemsPerPage?: number
}

export type CreateDeckArgs = Partial<Pick<Deck, 'cover' | 'isPrivate'>> & Pick<Deck, 'name'>

export type RetriveCardsInDeckParams = {
  question?: string
  answer?: string
  orderBy?: string
  currentPage?: string
  itemsPerPage?: string
}

export type CardType = {
  id: string
  deckId: string
  userId: string
  question: string
  answer: string
  shots: number
  answerImg: string
  questionImg: string
  questionVideo: string
  answerVideo: string
  grade: number
  created: Date
  updated: Date
}
export type createCardArgs = {
  question: string
  answer: string
  questionImg?: string
  answerImg?: string
  questionVideo?: string
  answerVideo?: string
}

export type DeckId = { id: Deck['id'] }
