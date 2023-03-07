import React from 'react';
import MainLayout from "./layouts/MainLayout";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components&pages/loginPage"
import RegistrationForm from "./components&pages/registerPage"
import RoomsTable from "./components&pages/RoomsTablePage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route path="/" element={<Login/>}/>
          <Route path="/registration" element={<RegistrationForm/>}/>
          <Route path="/rooms-table" element={<RoomsTable/>}/>
        </Route>
      </Routes>
      </Router>
  );
}

export default App;
