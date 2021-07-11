import {createStore, combineReducers, applyMiddleware} from 'redux'
import {notesReducer} from "./redux/notesReducer"

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
const myMiddleware = (store: any) => (next: any) => (action: any) => {
  if(action.type === 'ADD_NOTE' && action.payload === 'fuck') {
    action.payload = '****'
  }
  /**
   * Store của bạn thực hiện
   */
  console.log('store getState', store.getState())
  console.log('Action', action)
  /**
   * Truyền qua bước tiếp theo
   * Nếu hết thì nó dispatch action
   */
  return next(action);
}

// export const store = createStore(notesReducer);
export const store = createStore(
  reducer,
  applyMiddleware(myMiddleware)
);