import { RootState } from './store'

export const selectorVerifyEmail = (state: RootState) => {
  return state.app.email
}
