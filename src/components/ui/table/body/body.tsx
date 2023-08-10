import { ComponentPropsWithoutRef, FC } from 'react'

import clsx from 'clsx'

import style from './body.module.scss'

type TableBodyProps = ComponentPropsWithoutRef<'tbody'>

export const TableBody: FC<TableBodyProps> = ({ children, ...restProps }) => {
  const classNames = clsx(style.tableBody, restProps.className ?? '')

  return <tbody className={classNames}>{children}</tbody>
}

type TableRowProps = ComponentPropsWithoutRef<'tr'>

export const TableRow: FC<TableRowProps> = props => {
  return <tr {...props} />
}

export type CellProps = ComponentPropsWithoutRef<'td'>
export const TableCell: FC<CellProps> = ({ className, ...rest }) => {
  const classNames = clsx(style.tableCell, className ?? '')

  return (
    <td className={classNames} {...rest}>
      {rest.children}
    </td>
  )
}
