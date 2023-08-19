import { ComponentPropsWithoutRef, FC, ReactNode } from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import { CloseOutlineSvg } from '../../../assets/icons'
import Button from '../button/button'
import { Typography } from '../Typography'

import style from './modal.module.scss'

type ModalProps = {
  title: string
} & Dialog.DialogProps

export const Modal: FC<ModalProps> = ({ open, onOpenChange, title, children }: ModalProps) => (
  <Dialog.Root open={open} defaultOpen={false} onOpenChange={onOpenChange} modal={true}>
    <Dialog.Portal>
      <Dialog.Overlay className={style.DialogOverlay} />
      <Dialog.Content className={style.DialogContent}>
        <ModalTitle>{title}</ModalTitle>
        <div className={style.contentBox}>{children}</div>
        <ModalFooter>
          <Button variant={'primary'}>Button primary</Button>
        </ModalFooter>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)

const ModalTitle: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Dialog.Title className={style.DialogTitle}>
      <Typography variant="h2" as="h2" style={{ margin: 0, padding: 0 }}>
        {children}
      </Typography>

      <Dialog.Close asChild>
        <button className={style.closeButtonTitle}>
          <CloseOutlineSvg />
        </button>
      </Dialog.Close>
    </Dialog.Title>
  )
}

type ModalContentTextProps = ComponentPropsWithoutRef<'div'>

export const ModalContentText: FC<ModalContentTextProps> = ({ children }) => {
  return (
    <div className={style.ModalContentTextProps}>
      <Typography as="span" variant="body2" style={{ margin: 0, padding: 0 }}>
        {children}
      </Typography>
    </div>
  )
}

type ModalFooterProps = ComponentPropsWithoutRef<'div'>
export const ModalFooter: FC<ModalFooterProps> = ({ children }) => {
  return <div className={style.ModalFooter}>{children}</div>
}
