import React from "react";
import {Outlet} from "react-router-dom";
import Header from "../components&pages/Header";


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

//импортир из анта лэйаут,заменить <div className="content"> на него 

export default MainLayout