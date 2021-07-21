import {all} from 'redux-saga/effects'
import counterSaga from "./counter/counterSaga"
import { watchGetConversationsAsync } from '../chat/store/sagas/conversations';
import { watchGetMessagesAsync } from '../chat/store/sagas/messages';
/**
 * Root saga
 */
export default function* rootSage() {
  yield all([
    counterSaga(),
    watchGetConversationsAsync(),
    watchGetMessagesAsync()
  ]);
}