import { useEffect, useState } from 'react'

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

const defaultGrade = 1

export const Learn = () => {
  const { deckId } = useParams()

  const [isShowAnswer, setIsShowAnswer] = useState(false)
  const [grade, setGrade] = useState<number>(defaultGrade)
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
        setIsShowAnswer(false)
        setGrade(defaultGrade)
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
        <ImageOrQuestion text={data?.question ?? ''} img={data?.questionImg} title="Question" />
        <Typography as="span" variant="subtitle2" style={{ opacity: 0.5 }}>
          Количество попыток ответов на вопрос: <b>{data?.shots}</b>
        </Typography>
        {!isShowAnswer && <Button onClick={() => setIsShowAnswer(true)}>Show Answer</Button>}
        {isShowAnswer && (
          <>
            <ImageOrQuestion text={data?.answer ?? ''} img={data?.answerImg} title="Answer" />
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

const ImageOrQuestion = ({ img, text, title }: { text: string; img?: string; title: string }) => {
  if (img) {
    return (
      <>
        <Typography as="h3" variant={'subtitle2'} style={{ margin: 0 }}>
          {title}:
        </Typography>

        <ImageCard src={img ?? brokenImg} alt={'card ' + title} className={style.cardImgQuestion} />
      </>
    )
  }
  if (text) {
    return (
      <div className={style.textContainer}>
        <Typography as="h3" variant={'subtitle2'} style={{ margin: 0 }}>
          {title}:
        </Typography>
        <Typography as="span" variant={'subtitle2'} style={{ margin: 0, marginLeft: '0.5rem' }}>
          {text}
        </Typography>
      </div>
    )
  } else return <div>Bag in ImageOrQuestion Component</div>
}
