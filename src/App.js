import React from 'react';
import MainLayout from "./layouts/MainLayout";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components&pages/loginPage"
import RegistrationForm from "./components&pages/registerPage"
import RoomsTable from "./components&pages/RoomsTablePage"
import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dbFirestore } from "./firebase";
import { addRoomsToStore } from "../src/slices/roomsSlice";
import {query, collection, onSnapshot} from "firebase/firestore" 
import SingleRoomPage from './components&pages/SingleRoomPage';
import moment from 'moment'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const q = query(collection(dbFirestore, 'rooms')) 
    const unsubscribe = onSnapshot(q, (querySnapshot) => {   
      let roomsArr = []
      querySnapshot.forEach((doc) => {
        roomsArr.push({...doc.data(), id: doc.title})
      });
      
      roomsArr[0].table = roomsArr[0].table.map((room) => {
        if (!room.checkInDate || moment(room.checkInDate).isBefore(moment().format('YYYY-MM-DD'), 'day') ) {
          return {...room, isCheckedIn:false, guest:"", checkInDate: ''}
        }
        return room;
      }) 
      dispatch(addRoomsToStore(roomsArr))

    })
    return () => unsubscribe() 
    }, [])


  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route path="/" element={<Login/>}/>
          <Route path="/registration" element={<RegistrationForm/>}/>
          <Route path="/rooms-table" element={<RoomsTable/>}/>
          <Route path="/rooms/:roomId" element={<SingleRoomPage/>} />
        </Route>
      </Routes>
      </Router>
  );
}

export default App;