import {all} from 'redux-saga/effects'
import counterSaga from "./counter/counterSaga"

function* helloSaga() {
  console.log('Hello saga')
}

/**
 * Root saga
 */
export default function* rootSage() {
  console.log('RSSG')
  yield all([
    helloSaga(),
    counterSaga()
  ]);
}