import {all} from 'redux-saga/effects'
import counterSaga from "./counter/counterSaga"

/**
 * Root saga
 */
export default function* rootSage() {
  yield all([
    counterSaga()
  ]);
}