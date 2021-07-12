import {createStore, combineReducers, applyMiddleware} from 'redux'
import {notesReducer} from "./redux/notesReducer"
// import { Action, Dispatch, Store } from "redux"
import {IAction} from "./actions";
import thunk from "redux-thunk"
import { configureStore } from '@reduxjs/toolkit'
import {createLogger} from "redux-logger"

import counterReducer from './counter/counterSlice'


/**
 * Phân biệt các reducer
 */
const reducer = combineReducers({
  notes: notesReducer,
  counter: counterReducer,
})

/**
 * Middleware
 * @param store
 */
const myMiddleware = (store: any) => (next: any) => (action: IAction) => {
  console.log('action', action)
  if(action.type === 'ADD_NOTE' && action.payload.name === 'fuck') {
    action.payload = '****'
  }

  if(action.type === 'FETCH_NOTES') {

  }
  /**
   * Store của bạn thực hiện
   */
  /**
   * Truyền qua bước tiếp theo
   * Nếu hết thì nó dispatch action
   */
  return next(action);
}

/**
 * Redux thunk thay thế cho async middleware
 */
// const asyncMiddleware = (store: any) => (next: any) => (action: any) => {
//   if(typeof action === 'function') {
//     return action(next)
//   }
//
//   return next(action)
// }

// export const store = createStore(notesReducer);
// export const store = createStore(
//   reducer,
//   applyMiddleware(thunk, myMiddleware)
// );

const logger = createLogger();

export const store = configureStore({
  reducer,
  middleware: [thunk, myMiddleware]
})

export type RootState = ReturnType<typeof store.getState>
