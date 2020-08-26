import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from "react-router-dom"
import AdminPage from './pages/AdminPage';
import HomeSignInPage from './pages/HomeSignInPage'
import Topbar from './components/Topbar';
import PatientPage from './pages/PatientPage'
import Example from "./testing";
import {ToastContainer} from 'react-toastify'

function App() {
  return (
    <>
      <div>
        <ToastContainer/>
        <Topbar/>
        <Switch>
              <Route path='/testing'>
                <Example/>
              </Route>

              <Route exact path="/">
                <HomeSignInPage/>
              </Route>

              <Route path="/admin">
                <AdminPage/>
              </Route>
              <Route path="/patient">
                <PatientPage/>
              </Route>

        </Switch>
      </div>
    </>
        
  );
}

export default App;
