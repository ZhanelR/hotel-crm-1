import { takeEvery, all, put } from 'redux-saga/effects';
import {LOG_IN, REGISTER_SUCCESS, LOG_OUT} from "./userActionTypes"
import {setLoginSuccess, setRegisteredDataToStore, setLogout} from "../slices/usersSlice"
//import firebase from "../firebase"
import {auth} from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Button, message } from 'antd';


export default function* rootSaga() {
    yield all([
        ...loginSagas,
      ])
    
  }

  function* handleLogin (action) {
    try {
    const { login, password } = action.payload;
    const registeredUserCredential = yield signInWithEmailAndPassword(auth, login, password);
    yield put(setLoginSuccess(registeredUserCredential));
    } catch (error) {
    message.info('Failed to authorize user:  ' + error);
  }
} 

    function* handleLogout () {
        yield put(setLogout())
    }   
    function* handleRegistration (action) {
        try {
            // Create a new user account with email and password
            const { email, password } = action.payload;
            const userCredential = yield createUserWithEmailAndPassword(auth, email, password);
            console.log("userCredential", userCredential);
            // Set the registered user data to the store
            yield put(setRegisteredDataToStore(userCredential.user));
          } catch (error) {
            message.info('Failed to register user:  ' + error);
          }
    
}
export const loginSagas = [
  takeEvery(LOG_IN, handleLogin),
  takeEvery(REGISTER_SUCCESS, handleRegistration), 
  takeEvery(LOG_OUT, handleLogout),
]

