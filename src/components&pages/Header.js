import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actionUser";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { Link } from "react-router-dom"
import {login} from "../store/actionUser";

const Header = () => {
  const dispatch = useDispatch()
  const isAuthorized = useSelector((state) => state.user.isAuthorized);
  const navigate = useNavigate();

  //const [avatarUrl, setAvatarUrl] = useState('/');


  useEffect(() => {
    if (isAuthorized === false) {
      let loginData = localStorage.getItem("loginData");
      if(loginData){
        loginData = JSON.parse(loginData);
        dispatch(login({ login: loginData.login, password: loginData.password }));
      }else{
      navigate('/');
    }
    }
  }, [isAuthorized]);

/*   useEffect(() =>{
    const username = localStorage.getItem('username')
    setAvatarUrl(
        logged ? accounts[username].image : '/'
    )
}, [logged])
 */

  return (
    <div className="header">
      <Link to="/">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/lab-2-gallery-storage.appspot.com/o/FE-2-design_favicon.png?alt=media&token=822578c5-31ad-411f-9847-966b5b0766a3"
            alt="Logo"
            className="header-logo"
          />
      </Link>
      <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWq30lJjakol66evxTuoRPURIff_5PHf-snEPrJ4z3&s"} alt='avatar' className='avatar' />
      <button className="header-button" onClick={() => dispatch(logout())}>Log out</button>
    </div>
  )
}

export default Header