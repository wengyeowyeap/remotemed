import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import AdminPage from './pages/AdminPage';
import HomeSignInPage from './pages/HomeSignInPage'
import DoctorPage from './pages/DoctorPage'
import Topbar from './components/Topbar';
import Footer from './components/Footer'

function App() {
  return (
    <>
      <ToastContainer />
        <div id="page-container">
          <Topbar/>
          <div id="content-wrap">
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
          <Footer/>     
      </div>   
  
    </>
        
  );
}

export default App;
