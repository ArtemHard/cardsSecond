import { ComponentPropsWithRef, ComponentPropsWithoutRef, FC, MouseEventHandler } from 'react'

import clsx from 'clsx'

import { ChevronUp } from '../../../../assets/icons/ChevronUp'
import { Typography } from '../../Typography'
import { Column, Sort } from '../decks/decks-table.stories'

import style from './tableHeader.module.scss'

type TableHeaderProps = Omit<
  {
    columns: Array<Column>
    sort: Sort
    onSort: (data: Sort) => void
  } & ComponentPropsWithoutRef<'thead'>,
  'children'
>

const dataAttributes = {
  sortable: 'data-sortable',
  key: 'data-key',
} as const

export const TableHeader = ({ columns, sort, onSort }: TableHeaderProps) => {
  const handleSorting: MouseEventHandler<HTMLTableCellElement> = e => {
    // debugger
    const isSortable = e.currentTarget.getAttribute(dataAttributes.sortable)
    const key = e.currentTarget.getAttribute(dataAttributes.key)

    // if (!(e.target instanceof HTMLTableCellElement)) return
    if (key === null) throw new Error('No data-key found!')
    if (!isSortable || isSortable !== 'true') return
    if (key !== sort?.key) return onSort({ key, direction: 'asc' })
    if (sort.direction === 'asc') {
      return onSort({ key, direction: 'desc' })
    }
    onSort(null)
  }

  return (
    <thead className={style.root}>
      <tr>
        {columns.map(column => {
          const showSort = column.isSortable && sort && sort.key === column.key
          const arrowStyle = clsx(
            style.hiddenSvg,
            sort?.direction === 'asc' && showSort && style.arrowUp,
            sort?.direction === 'desc' && showSort && style.arrowDown
          )

          return (
            <HeadCell
              key={column.key + 'head'}
              column={column}
              className={sortedLineClass(sort?.key, column.key, column.isSortable)}
              onClick={handleSorting}
            >
              {column.title}
              {<ChevronUp className={arrowStyle} />}
            </HeadCell>
            // <th
            //   key={column.title}
            //   className={sortedLineClass(sort?.key, column.key, column.isSortable)}
            //   {...{
            //     [dataAttributes.sortable]: column.isSortable,
            //     [dataAttributes.key]: column.key,
            //   }}
            //   onClick={handleSorting}
            // >
            //   <span>
            //     {column.title}
            //     <ChevronUp className={arrowStyle} />
            //   </span>
            // </th>
          )
        })}
      </tr>
    </thead>
  )
}
type HeadCellProps = ComponentPropsWithoutRef<'th'> & { column: Column }

const HeadCell = ({ column, children, ...restProps }: HeadCellProps) => {
  return (
    <th
      {...{
        [dataAttributes.sortable]: column.isSortable ?? false,
        [dataAttributes.key]: column.key,
      }}
      {...restProps}
    >
      <Typography variant="subtitle2" style={{ margin: 0 }}>
        {children}
      </Typography>
    </th>
  )
}

const sortedLineClass = (
  currentSort: string | undefined,
  columnSort: string,
  isSortable: boolean | undefined
) => {
  return currentSort === columnSort && isSortable ? style.sortedLine : undefined
}

type TableBodyProps = ComponentPropsWithoutRef<'tbody'>

export const TableBody: FC<TableBodyProps> = ({ children, ...restProps }) => {
  const classNames = clsx(style.tableBody, restProps.className ?? '')

  return <tbody className={classNames}>{children}</tbody>
}

type TableRowProps = ComponentPropsWithoutRef<'tr'>

export const TableRow: FC<TableRowProps> = props => {
  return <tr {...props} />
}

export type CellProps = ComponentPropsWithRef<'td'>

export const TableCell: FC<CellProps> = ({ className, ...rest }) => {
  const classNames = clsx(style.tableCell, className ?? '')

  return (
    <td className={classNames} {...rest}>
      {rest.children}
    </td>
  )
}
