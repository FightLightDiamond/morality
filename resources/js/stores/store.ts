import {combineReducers} from 'redux'
import {notesReducer} from "./note/notesReducer"
import {IAction} from "./actions";
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from './counter/counterSlice'
import authReducer from './auth/authSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { pokemonApi } from '../services/pokemonService'
import { authApi } from '../services/authService'
import { tagApi } from '../services/tagService'
import { setupListeners } from '@reduxjs/toolkit/query'
import conversationState from '../chat/store/reducers/conversations';
import messagesState from '../chat/store/reducers/messages';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger'
import rootSage from "./rootSaga"
/**
 * Config cache
 */
const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2 // Xem thêm tại mục "Quá trình merge".
};

/**
 * Phân biệt các reducer
 */
const rootReducer = combineReducers({
  notes: persistReducer(persistConfig, notesReducer),
  counter: counterReducer,
  auth: authReducer,
  conversationState: persistReducer(persistConfig, conversationState),
  messagesState: persistReducer(persistConfig, messagesState),
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [tagApi.reducerPath]: tagApi.reducer,
})

/**
 * Middleware
 * @param store
 */
const myMiddleware = (store: any) => (next: any) => (action: IAction) => {
  // console.log('action', action)
  if(action.type === 'ADD_NOTE' && action.payload.name === 'fuck') {
    action.payload = '****'
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
 * Create Saga
 */
const sagaMiddleware = createSagaMiddleware();

/**
 * Middleware option
 */
const middlewareOption = {
  thunk: true,
  immutableCheck: true,
  serializableCheck: {
    // Ignore these action types
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, "tagApi/executeQuery/fulfilled"],
    // Ignore these field paths in all actions
    ignoredActionPaths: ['*api*'],
    // Ignore these paths in the state
    ignoredPaths: ['*api*'],
  },
}

/**
 * Configure store
 */
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(middlewareOption)
      .concat(tagApi.middleware)
      .concat(authApi.middleware)
      .concat(pokemonApi.middleware)
      .concat(myMiddleware)
      .concat(logger)
      .concat(sagaMiddleware),
})

/**
 * Setup API dispatch
 */
setupListeners(store.dispatch)

/**
 * Run Saga
 */
sagaMiddleware.run(rootSage)

/**
 * Export
 */
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
  >;

/**
 * takeEvery: mỗi khi reduces gửi action thi fetch
 * put: dispatch action put {type, action} <=> dispatch(type, action)
 *
 * Effect: JS Object: để middleware cần phải làm gì, báo reducer thực thi action call(function, 'arg1'). Gọi action, gọi APi
 *
 * Task: process chạy dưới {fork} khi nào chạy xong nó sẽ báo, dùng để call API
 *
 * Blocking:
 *  - yield: take đợi đến khi nào dispatch 1 action
 *
 * Non-blocking:
 * - yield: fork(worker, action.payload) : không đợi
 *
 * Watcher: theo doi function* watcher() : take fork()
 * Worker: function* worker(payload) :
 *
 * Middleware.run
 * takeLatest: Mỗi lần có 1 action được dispatch lên redux store sẽ chạy mySaga, nhảy vào yield lấy thằng cuối cùng, sẽ cancel những cái trùng lặp
 * yield call api
 * try yield put
 * catch yield put
 *
 * interface: Có thể khai báo để thêm
 * type: không thể khai báo để thêm thuộc tính sẽ bị duplicate
 * interface có thể extends để thêm thuộc tính mới
 *
 * */
