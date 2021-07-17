import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from "../store"

export interface CounterState {
  value: number
  status: 'loading' | 'success' | 'fail'
}

const initialState: CounterState = {
  value: 0,
  status: 'loading'
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    /**
     *
     * @param state
     */
    increment: (state, action: PayloadAction<number>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += action.payload
    },
    /**
     *
     * @param state
     */
    decrement: (state, action: PayloadAction<number>) => {
      state.value -= 1
    },
    /**
     *
     * @param state
     * @param PayloadAction action
     */
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
  /**
   * Tự viết tên không theo chuẩn
   * @param builder
   */
  extraReducers: (builder) => {
    builder.addCase('abnc', (state) => {
      state.status = 'loading'
    })
  }
})

export const selectCount = (state: RootState) => state.counter.value

// Extract the action creators object and the reducer
const { actions, reducer } = counterSlice
// Extract and export each action creator by name
export const { increment, decrement, incrementByAmount } = actions
// Export the reducer, either as a default or named export
export default reducer