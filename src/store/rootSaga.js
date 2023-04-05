import { takeEvery, all, put, select } from 'redux-saga/effects';
import {LOG_IN, REGISTER_SUCCESS, LOG_OUT} from "./userActionTypes"
import {setLoginSuccess, setRegisteredDataToStore, setLogout} from "../slices/usersSlice"
import {auth} from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Button, message } from 'antd';
import { CHECK_IN_ROOM, CHECK_OUT_ROOM } from "./roomsActionTypes";
import {dbFirestore} from "../firebase";
import { updateDoc, doc, getDoc } from "firebase/firestore" 

export default function* rootSaga() {
    yield all([
        ...loginSagas,
        ...roomSagas,
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
      localStorage.removeItem("loginData");
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

function* handleCheckInStatus (action) {
  const {user, room} = action.payload;
  console.log(action.payload)
  let rooms = yield select(state => state.room.items);
  rooms = rooms.map((item) =>{
    if(item.id === room.id){
      return {...item, guest: user.name, isCheckedIn: room.isCheckedIn, checkInDate: room.checkInDate}
    } 
    return item
  })
   yield updateDoc(doc(dbFirestore, 'rooms', "MC8azwl8TNafXCLLtqMF"), {
          table: rooms
    })
}

function* handleCheckOut (action) {
        /*       yield updateDoc(doc(db, 'rooms', todo.id), {
                completed: !todo.completed
              }) */
      }
export const roomSagas = [
  takeEvery(CHECK_IN_ROOM, handleCheckInStatus),
  takeEvery(CHECK_OUT_ROOM, handleCheckInStatus), 

]



