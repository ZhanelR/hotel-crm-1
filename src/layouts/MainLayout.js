import {Outlet} from "react-router-dom";
import Header from "../components&pages/Header";
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { getRooms } from '../store/actionRooms';
import { room } from '../components&pages/SingleRoomPage';

const MainLayout = () => {


  return (
    <div className="wrapper">
      <Header/>
      <div className="content">
        <Outlet/>
      </div>
    </div>
  )
}

export default MainLayout