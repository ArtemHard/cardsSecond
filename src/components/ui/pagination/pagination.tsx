import clsx from 'clsx'

import { ChevronUp } from '../../../assets/icons'
import { SelectRoot } from '../select'
import { Typography } from '../Typography'

import style from './pagination.module.scss'
import { usePagination } from './usePagination'

export type PaginationProps = {
  count: number
  page: number
  onChange: (page: number) => void
  siblings?: number
  perPage?: number
  perPageOptions: number[]
  onPerPageChange: (itemPerPage: number) => void
  defaultValue?: number
}

export const Pagination = ({
  count,
  siblings,
  page,
  onChange,
  perPageOptions,
  onPerPageChange,
  defaultValue,
}: PaginationProps) => {
  const {
    handleNextPageClicked,
    handlePreviousPageClicked,
    handleMainPageClicked,
    paginationRange,
    isFirstPage,
    isLastPage,
  } = usePagination({
    count,
    siblings,
    page,
    onChange,
  })

  const onValueChange = (value: string) => {
    onPerPageChange(+value)
  }

  return (
    <div className={style.root}>
      <div className={style.pageWrapper}>
        <NextButton onClick={handlePreviousPageClicked} disabled={isFirstPage} />
        <MainPaginationButtons
          currentPage={page}
          onClick={handleMainPageClicked}
          paginationRange={paginationRange}
        />
        <PrevButton onClick={handleNextPageClicked} disabled={isLastPage} />
      </div>
      <div className={style.selecBlockWrapper}>
        <Typography variant="body2" as="span">
          Показать
        </Typography>
        <SelectRoot
          options={perPageOptions}
          defaultValue={defaultValue?.toString()}
          onValueChange={onValueChange}
          className={style.selectButton}
        />
        <Typography variant="body2" as="span">
          на странице
        </Typography>
      </div>
    </div>
  )
}

type NavigationButtonProps = {
  onClick: () => void
  disabled?: boolean
}

type PageButtonProps = NavigationButtonProps & {
  page: number
  selected: boolean
}

const PageButton = ({ onClick, selected, disabled, page }: PageButtonProps) => {
  const classNames = clsx(style.pageButton, selected && style.selected)

  return (
    <button onClick={onClick} disabled={selected || disabled} className={classNames}>
      <Typography variant="body2" as="span" style={{ color: 'inherit' }}>
        {page}
      </Typography>
    </button>
  )
}
const NextButton = ({ onClick, disabled }: NavigationButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled} className={style.shevroneButton}>
      <ChevronUp className={style.nextChevrone} />
    </button>
  )
}

const PrevButton = ({ onClick, disabled }: NavigationButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled} className={style.shevroneButton}>
      <ChevronUp className={style.prevShevrone} />
    </button>
  )
}

type MainPaginationButtonsProps = {
  paginationRange: (number | string)[]
  currentPage: number
  onClick: (pageNumber: number) => () => void
}

const Dots = () => {
  return <span>...</span>
}

const MainPaginationButtons = ({
  paginationRange,
  currentPage,
  onClick,
}: MainPaginationButtonsProps) => {
  return (
    <>
      {paginationRange.map((page: number | string, index) => {
        const isSelected = page === currentPage

        if (typeof page !== 'number') {
          return <Dots key={index} />
        }

        return <PageButton key={index} page={page} selected={isSelected} onClick={onClick(page)} />
      })}
    </>
  )
}
