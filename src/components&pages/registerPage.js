import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {registerSuccess} from "../store/actionUser";
import "./registerPage.css"


const RegistrationForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmitRegistration = (e) => {
    e.preventDefault();
    dispatch(registerSuccess({firstName, lastName, email, password, confirmPassword}))
  }

  return (
    <div className='general-containder'>
      <form onSubmit={handleSubmitRegistration}>
      
        <h1 className='header-register'>Register now to access the CRM</h1>
        <div className='form-container'>
          <div>
            <label htmlFor="first-name">First Name:</label>
            <input type="text" id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="last-name">Last Name:</label>
            <input type="text" id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input type="password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <button className='button-register' type="submit">Register</button>
        </div>
      </form>
      
    </div>
  );
};

export default RegistrationForm;


