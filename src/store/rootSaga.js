//26:24 video toolkit saga
import { takeEvery, all, put } from 'redux-saga/effects';
import {LOG_IN} from "../store/userActionCreator"
import {setLoginAndPassToStore} from "../slices/usersSlice"
import { genActionStyle } from 'antd/es/alert/style';

export default function* rootSaga() {
    yield all([
        ...loginSagas
      ])
    // code after all-effect
  }

  function* handleLogin (action) {
    console.log(action.payload);
    yield put(setLoginAndPassToStore(action.payload))
}
export const loginSagas = [
  takeEvery(LOG_IN, handleLogin),
]

