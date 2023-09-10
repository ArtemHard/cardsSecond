import { useEffect, useRef, useState } from 'react'

import { Link, useParams } from 'react-router-dom'

import brokenImg from '../../assets/images/reactJS.png'
import Button from '../../components/ui/button/button'
import { Card } from '../../components/ui/card'
import { OptionRadio, RadioButtons } from '../../components/ui/radio-buttons'
import { Typography } from '../../components/ui/Typography'
import { PATH } from '../../routes'
import {
  useGetDeckQuery,
  useLazyRetriveRandomCardQuery,
  useSaveGradeCardMutation,
} from '../../services/decks'
import { cutStringParams } from '../../utils'
import { ImageCard } from '../decks'

import style from './learn.module.scss'

export const Learn = () => {
  const { deckId } = useParams()

  const [isShowAnswer, setIsShowAnswer] = useState(false)
  const [grade, setGrade] = useState<number>()
  const [retriveRandomCard, { data }] = useLazyRetriveRandomCardQuery()
  const [updateGrade] = useSaveGradeCardMutation()

  const { data: deckInfo } = useGetDeckQuery(
    { id: deckId ?? '' },
    { skip: typeof deckId !== 'string' }
  )

  useEffect(() => {
    if (deckId) {
      retriveRandomCard({ id: deckId })
    }
  }, [deckId])
  const onValueChangeRate = (value: string) => {
    setGrade(+value)
  }

  const nextQuestionHandler = () => {
    if (data?.deckId && data?.id)
      if (data && grade) {
        const { deckId, id } = data

        updateGrade({ deckId, cardId: id, grade: +grade })
        retriveRandomCard({ id: deckId, previousCardId: id })
      }
  }

  return (
    <Card className={style.root}>
      <Typography as="h1" variant="large" className={style.title}>
        Learn{' '}
        <Link
          to={cutStringParams(PATH.CARDS) + deckId}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          {deckInfo?.name}
        </Link>
      </Typography>
      <div className={style.questionContainer}>
        <Typography as="h3" variant={'subtitle2'} style={{ margin: 0 }}>
          Question:
        </Typography>
        <ImageCard
          src={data?.questionImg ?? brokenImg}
          alt="card question"
          className={style.cardImgQuestion}
        />
        <Typography as="span" variant="subtitle2" style={{ opacity: 0.5 }}>
          Количество попыток ответов на вопрос: <b>{data?.shots}</b>
        </Typography>
        {!isShowAnswer && <Button onClick={() => setIsShowAnswer(true)}>Show Answer</Button>}
        {isShowAnswer && (
          <>
            <Typography as="h3" variant={'subtitle2'} style={{ margin: 0 }}>
              Answer:
            </Typography>
            <ImageCard
              src={data?.questionImg ?? brokenImg}
              alt="card answer"
              className={style.cardImgQuestion}
            />
            <Typography as="h3" variant={'subtitle2'} style={{ margin: 0 }}>
              Rate yourself:
            </Typography>
            <RadioButtons options={options} defaultValue={'1'} onValueChange={onValueChangeRate} />
            <Button onClick={nextQuestionHandler}>Next Question</Button>
          </>
        )}
      </div>
    </Card>
  )
}

const options: OptionRadio[] = [
  { value: '1', label: 'Did not know' },
  { value: '2', label: 'Forgot' },
  { value: '3', label: 'A lot of though' },
  { value: '4', label: 'Confused' },
  { value: '5', label: 'Knew the answer' },
]
