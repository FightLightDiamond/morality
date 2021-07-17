import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { Dispatch } from "redux"

export interface IAuthState {
  token?: string
}

/**
 * Thường sẽ là any
 */
const initialState: any = {
  token: ""
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state: IAuthState, action: PayloadAction<any>) => {
      state.token = action.payload.token
    }
  }
})

export interface ILoginData {
  email: string
  password: string
  token_name: string
}

// Extract the action creators object and the reducer
const { actions, reducer } = authSlice
// Extract and export each action creator by name
export const { loginSuccess } = actions
// Export the reducer, either as a default or named export
export default reducer

export const login = ({ email, password }: ILoginData) => async (dispatch: Dispatch) => {
  const token_name = "user"
  const res = await axios.post("/api/login", { email, password, token_name })
  dispatch(loginSuccess(res.data))
}
