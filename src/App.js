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

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const q = query(collection(dbFirestore, 'rooms')) 
    const unsubscribe = onSnapshot(q, (querySnapshot) => {   
      let postsArr = []
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
        postsArr.push({...doc.data(), id: doc.title})
      });
      dispatch(addRoomsToStore(postsArr))

    })
    return () => unsubscribe() //отписка от соединение когда компон unmount (напр, если что-то не так и компон не отображ)
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
