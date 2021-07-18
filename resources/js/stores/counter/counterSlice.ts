import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

export interface CounterState {
  value: number
  status: "loading" | "success" | "idle"
}

const initialState: CounterState = {
  value: 0,
  status: "loading"
}

export const counterSlice = createSlice({
  name: "counter",
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
    incrementSaga: (state, action: PayloadAction<number>) => {
      state.status = "loading"
    },
    incrementSagaSuccess: (state, action: PayloadAction<number>) => {
      state.status = "idle"
      state.value += action.payload
    }
  },
  /**
   * Tự viết tên không theo chuẩn
   * @param builder
   */
  extraReducers: (builder) => {
    builder
    // .addCase(incrementAsync.pending, (state) => {
    //   state.status = "loading"
    // })
    // .addCase(incrementAsync.fulfilled, (state, action) => {
    //   state.status = "idle"
    //   state.value += action.payload
    // })
  }
})

export const selectCount = (state: RootState) => state.counter.value

// Extract the action creators object and the reducer
const { actions, reducer } = counterSlice
// Extract and export each action creator by name
export const { increment, decrement, incrementByAmount } = actions
// Export the reducer, either as a default or named export
export default reducer