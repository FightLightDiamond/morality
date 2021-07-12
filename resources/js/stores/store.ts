import {createStore, combineReducers, applyMiddleware} from 'redux'
import {notesReducer} from "./redux/notesReducer"
// import { Action, Dispatch, Store } from "redux"
import {IAction} from "./actions";
import thunk from "redux-thunk"


/**
 * Phân biệt các reducer
 */
const reducer = combineReducers({
  notes: notesReducer
})

/**
 * Middleware
 * @param store
 */
const myMiddleware = (store: any) => (next: any) => (action: IAction) => {
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
export const store = createStore(
  reducer,
  applyMiddleware(thunk, myMiddleware)
);
