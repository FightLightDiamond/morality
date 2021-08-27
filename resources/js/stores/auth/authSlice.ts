import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { Dispatch } from "redux"
import Cookies from "js-cookie"
import ILoginData from "../../contracts/Data/ILoginData"
import {TOKEN_STORAGE_KEY} from "../../const/key.const"
import IAuthState from "../../contracts/State/IAuthState"

/**
 * Thường sẽ là any
 */
const initialState: any = {
  token: Cookies.get(TOKEN_STORAGE_KEY)
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state: IAuthState, action: PayloadAction<any>) => {
      const {token} = action.payload

      Cookies.set(TOKEN_STORAGE_KEY, token)
      state.token = token
    }
  }
})

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
