import { PayloadAction, createSlice } from '@reduxjs/toolkit'
type initialStateType = {
  email: null | string
}
const initialState: initialStateType = {
  email: null,
}
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateEmail(state, action: PayloadAction<string | null>) {
      state.email = action.payload
    },
  },
})

export const appReducer = appSlice.reducer
export const appActions = appSlice.actions
