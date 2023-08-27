import { TrashOutline } from '../../../assets/icons'
import Button from '../../ui/button/button'
import { Input } from '../../ui/Input'
import { Slider } from '../../ui/slider'
import { TabSwither } from '../../ui/tab-switcher'
import { Typography } from '../../ui/Typography'

import style from './decks-filter.module.scss'

const swithButtonsParams = [
  { label: 'My Cards', value: 'My Cards' },
  { label: 'All Cards', value: 'All Cards' },
]

export const DecksFilter = () => {
  return (
    <>
      <div className={style.title__container}>
        <Typography variant="large">Decks list</Typography>
        <Button>Add New Pack</Button>
      </div>
      <div className={style.params__container}>
        <Input type="search" />
        <div className={style.paramWrapper}>
          <Typography as="span" variant="body2">
            Show decks cards
          </Typography>
          <TabSwither
            buttons={swithButtonsParams}
            onValueChange={(value: string) => alert('CHANGE ' + value)}
            defaultValue={'All Cards'}
          />
        </div>
        <div className={style.paramWrapper}>
          <Typography as="span" variant="body2">
            Number of cards
          </Typography>
          <Slider />
        </div>
        <div className={style.paramWrapper}>
          <Button variant="secondary">
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
