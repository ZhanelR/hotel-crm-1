import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actionUser";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./Header.css"

const Header = () => {
  const dispatch = useDispatch()
  const isAuthorized = useSelector((state) => state.user.isAuthorized);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized === false) {
      navigate('/');
    }
  }, [isAuthorized]);
  return (
    <div className="header">
      <p className="logo">CRM Hotel</p>
      <button className="header-button" onClick={() => dispatch(logout())}>Log out</button>
    </div>
  )
}

export default Header