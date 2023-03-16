
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './AppNavbar';
import Home from './Home';
import Profile from './Profile';
import Register from './Register';
import Login from './Login';
import AuthService from '../services/AuthService';
import PatientList from './PatientList';
import PatientEdit from "./PatientEdit";

function App() {
const [user, setUser] = useState(AuthService.getCurrentUser());

return (
<Router>
<div className="App">
<Navbar user={user} setUser={setUser} />
<div className="container mt-3">
      <Routes>
        <Route exact path="/" element={Home} />
        <Route exact path="/getPatients" element={PatientList}></Route>
        <Route path='/api/patients/updatePatient/:id' element={PatientEdit}/>
        <Route path="/profile" element={Profile} />
        <Route
          path="/register"
          render={() => <Register setUser={setUser} />}
        />
        <Route
          path="/login"
          render={() => <Login setUser={setUser} />}
        />
      </Routes>
    </div>
  </div>
</Router>
);
}

export default App;