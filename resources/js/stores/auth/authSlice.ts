import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from "axios";
import { Dispatch } from "redux"

export interface IAuthState {
  token?: string
}

const initialState: IAuthState = {
  token: ''
}

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<IAuthState>) => {
      state.token = action.payload.token
    },
  },
})

interface ILoginData {
  email: string
  password: string
  token_name: string
}

// Action creators are generated for each case reducer function
export const { loginSuccess } = auth.actions

export const login = (request: ILoginData) => async (dispatch: Dispatch) => {
  request.token_name = 'user'
  const res = await axios.post('/api/login', request)
  dispatch(loginSuccess(res.data))
}

// reducer
export default auth.reducer
