import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
// https://redux-toolkit.js.org/rtk-query/usage-with-typescript#inline-error-handling-example
/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  )
}
// my func
export const errorCommonHandler = (err: any): string => {
  if (isFetchBaseQueryError(err) && err.status === 'FETCH_ERROR') return 'No internet connection'
  if (typeof err?.data?.message === 'string') return err.data.message
  if (typeof err?.data?.errorMessages[0]?.message === 'string')
    return err?.data?.errorMessages[0]?.message
  else return 'Some error'
}
