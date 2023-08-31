import { DevTool } from '@hookform/devtools'
import Button from '../../../ui/button/button'
import { ImageSvg } from '../../../../assets/icons'
import { Typography } from '../../../ui/Typography'
import { ControlledInput } from '../../../ui/controlled/controlled-input'
import { FormValuesCreateDeck, useAddDeckForm } from '..'
import { ControlledCheckbox } from '../../../ui/controlled/controlled-checkbox'
import { ModalFooter } from '../../../ui/modal'
import deckImg from '../../../../assets/images/reactJS.png'
import style from './create-deck-form.module.scss'

type CreateDeckFromProps = {
  onSubmitModalHandler: (data: FormValuesCreateDeck) => void
  setIsOpenModal: (isOpen: boolean) => void
}

export const CreateDeckFrom = ({ onSubmitModalHandler, setIsOpenModal }: CreateDeckFromProps) => {
  const { handleSubmit, register, control } = useAddDeckForm({ onSubmit: onSubmitModalHandler })

  return (
    <form onSubmit={handleSubmit}>
      <DevTool control={control} />
      <img src={deckImg} className={style.deckImg}></img>
      <Button as="label" variant="secondary" fullWidth={true} className={style.addCoverBtn}>
        <ImageSvg />
        <Typography variant="subtitle2" as="span">
          Change Cover
        </Typography>
        <input type="file" {...register('cover')} style={{ display: 'none' }} />
      </Button>
      <ControlledInput
        control={control}
        type="text"
        name="name"
        label="Name Pack"
        className={style.packNameInput}
      />
      <ControlledCheckbox
        control={control}
        name="isPrivate"
        label={'Private pack'}
        position="left"
        defaultValue={false}
        className={style.isPrivate}
      />
      <ModalFooter>
        <Button variant={'primary'} type="submit">
          Create Deck
        </Button>
        <Button variant={'secondary'} type="submit" onClick={() => setIsOpenModal(false)}>
          Cancel
        </Button>
      </ModalFooter>
    </form>
  )
}
