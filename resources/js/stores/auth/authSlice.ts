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

interface IAction {
  type: string
  payload: {
    token: string
  }
}

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state: IAuthState, action: PayloadAction<any>) => {
      state.token = action.payload.token
    }
  }
})

interface ILoginData {
  email: string
  password: string
  token_name: string
}

// Action creators are generated for each case reducer function
export const { loginSuccess } = auth.actions

export const login = ({ email, password }: ILoginData) => async (dispatch: Dispatch) => {
  const token_name = "user"
  const res = await axios.post("/api/login", { email, password, token_name })
  dispatch(loginSuccess(res.data))
}

// reducer
export default auth.reducer
