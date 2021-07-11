import {createStore, combineReducers} from 'redux'
import {notesReducer} from "./redux/notesReducer"

/**
 * Phân biệt các reducer
 */
const reducer = combineReducers({
  notes: notesReducer
})

// export const store = createStore(notesReducer);
export const store = createStore(reducer);