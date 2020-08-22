import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from "react-router-dom"
import AdminPage from './pages/AdminPage';
import HomeSignInPage from './pages/HomeSignInPage'
import DoctorPage from './pages/DoctorPage'
import Topbar from './components/Topbar';


function App() {
  return (
    <>
      <div>
        <Topbar/>
        <Switch>

              <Route exact path="/">
                <HomeSignInPage/>
              </Route>

              <Route path="/admin">
                <AdminPage/>
              </Route>

              <Route path="/doctor">
                <DoctorPage/>
              </Route>

        </Switch>
      </div>
    </>
        
  );
}

export default App;
