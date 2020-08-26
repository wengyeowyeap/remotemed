import React,{useState} from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import AdminPage from './pages/AdminPage';
import HomeSignInPage from './pages/HomeSignInPage'
import DoctorPage from './pages/DoctorPage'
import Topbar from './components/Topbar';
<<<<<<< HEAD
import PatientPage from './pages/PatientPage'
import Example from "./testing";
import {ToastContainer} from 'react-toastify'
=======
import Footer from './components/Footer'
>>>>>>> 19be9350695a569cf020371c898937dd3570ba28

function App() {
  const [token, setToken] = useState(null)

  return (
    <>
<<<<<<< HEAD
      <div>
        <ToastContainer/>
        <Topbar/>
        <Switch>
              <Route path='/testing'>
                <Example/>
              </Route>
=======
      <ToastContainer />
        <div id="page-container">
          <Topbar token={token} setToken={setToken}/>
          <div className="container-fluid" id="content-wrap">
          <Switch>

                <Route exact path="/">
                  <HomeSignInPage token={token} setToken={setToken}/>
                </Route>
>>>>>>> 19be9350695a569cf020371c898937dd3570ba28

                <Route path="/admin">
                  <AdminPage/>
                </Route>

<<<<<<< HEAD
              <Route path="/admin">
                <AdminPage/>
              </Route>
              <Route path="/patient">
                <PatientPage/>
              </Route>
=======
                <Route path="/doctor">
                  <DoctorPage/>
                </Route>
>>>>>>> 19be9350695a569cf020371c898937dd3570ba28

          </Switch>
          </div>
          <Footer/>     
      </div>   
  
    </>
        
  );
}

export default App;
