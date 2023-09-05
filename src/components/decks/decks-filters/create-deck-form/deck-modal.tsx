import { DevTool } from '@hookform/devtools'

import { useAddDeckForm, useAddDeckFormType } from '..'
import { ImageSvg } from '../../../../assets/icons'
import deckImg from '../../../../assets/images/reactJS.png'
import Button from '../../../ui/button/button'
import { ControlledCheckbox } from '../../../ui/controlled/controlled-checkbox'
import { ControlledInput } from '../../../ui/controlled/controlled-input'
import { ModalFooter } from '../../../ui/modal'
import { Typography } from '../../../ui/Typography'

import style from './deck-modal.module.scss'

type CreateDeckFromProps = {
  submitTextButton: string
  setIsOpenModal: (isOpen: boolean) => void
} & useAddDeckFormType

export const DeckModal = ({
  onSubmit,
  setIsOpenModal,
  defaultData,
  submitTextButton,
}: CreateDeckFromProps) => {
  const { handleSubmit, register, control, watch } = useAddDeckForm({
    onSubmit: onSubmit,
    defaultData,
  })

  const checkCoverType = (cover: any): string | undefined => {
    if (typeof cover === 'string') return cover
    if (cover instanceof FileList) {
      return watch('cover')[0] ? window.URL.createObjectURL(watch('cover')[0]) : undefined
    }

    return undefined
  }

  return (
    <form onSubmit={handleSubmit}>
      <DevTool control={control} />
      <img src={checkCoverType(watch('cover')) ?? deckImg} className={style.deckImg}></img>
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
          {submitTextButton}
        </Button>
        <Button variant={'secondary'} type="submit" onClick={() => setIsOpenModal(false)}>
          Cancel
        </Button>
      </ModalFooter>
    </form>
  )
}
