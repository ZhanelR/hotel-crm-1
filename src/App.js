import React from 'react';
import MainLayout from "./layouts/MainLayout";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components/loginPage"
import RegistrationForm from "./components/registerPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route path="/" element={<Login/>}/>
          <Route path="registration" element={<RegistrationForm/>}/>
          <Route path="CRM" element={<RegistrationForm/>}/>
        </Route>
      </Routes>
      </Router>
  );
}

export default App;
