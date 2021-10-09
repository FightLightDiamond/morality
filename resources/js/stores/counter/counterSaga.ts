import { takeEvery, takeLatest, delay, put } from "redux-saga/effects"
import { PayloadAction } from "@reduxjs/toolkit"
import { increment, decrement, incrementAsync, incrementSaga, incrementSagaSuccess } from "../counter/counterSlice"

/**
 * Log action
 * @param action
 */
export function* log(action: PayloadAction) {

}

function* handleIncrementSaga(action: PayloadAction) {
  yield delay(2000)
  /**
   * Gọi action
   */
  yield put(incrementSagaSuccess(2))
  /**
   * Call gọi hàm
   */
}

export default function* counterSaga() {
  /**
   * Effect creator: return Object(), not execute
   *
   * takeEvery: Lắng nghe liên tùng tục
   * takeLatest: action pattern mới được dispatch, còn đâu bị cancel
   * takeLeading:action pattern đầu tiên được dispatch, còn đâu bị cancel đến khi chạy xong
   * put: dispatch action
   * call: gọi function truyền tham số. ex: call(function saga)
   * all: chạy tất cả effect 1 lúc
   * take and fork: watcher ... worker, đợi dispatch action pattern thì sẽ thực hiện 1 task nào đó
   * throttle(ms, patter, saga, ..args): chỉ chạy action 1 lần trong một khoảng thời gian
   * debounce(ms, pattern, saga, ..args): đảm bảo chỉ saga 1 lần sau khi đã đợi khoảng thời gian ms
   * retry(maxTries, delay, fn, ..args): gọi hàm fn nếu failed, sau mỗi delay millieseconds(bao lâu chạy lại), và tối đa số lần chạy maxTries lần
   */
  yield takeLatest(incrementSaga.toString(), handleIncrementSaga)
  yield takeLatest(increment.toString(), log)
  yield takeLatest(incrementAsync.toString(), log)
  yield takeLatest(decrement.toString(), log)

  /**
   * Tương đương hàm put action
   * fork: chạy looix báo thằng cha, cancel tất cả những hàm dang chạy, kiểu như transaction. Không try catch trực tiếp trong hàm gọi fork.
   * Do vậy phải bọc nó bởi 1 function. Nghĩa là handle error tại function cha
   * spawn: chạy lỗi không liên quan
   */
}
