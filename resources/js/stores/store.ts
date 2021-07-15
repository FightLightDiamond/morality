import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {notesReducer} from "./redux/notesReducer"
// import { Action, Dispatch, Store } from "redux"
import {IAction} from "./actions";
import thunk from "redux-thunk"
import { configureStore } from '@reduxjs/toolkit'
import {createLogger} from "redux-logger"

import counterReducer from './counter/counterSlice'
import authReducer from './auth/authSlice'

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';


const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2 // Xem thêm tại mục "Quá trình merge".
};

import conversationState from '../chat/store/reducers/conversations';
import messagesState from '../chat/store/reducers/messages';
// const pReducer = persistReducer(persistConfig, counterSlice);
/**
 * Phân biệt các reducer
 */
const rootReducer = combineReducers({
  notes: persistReducer(persistConfig, notesReducer),
  counter: counterReducer,
  auth: authReducer,
  conversationState: persistReducer(persistConfig, conversationState),
  messagesState: persistReducer(persistConfig, messagesState),
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

import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware)
);


const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, myMiddleware, enhancer]
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export default store
