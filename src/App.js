import React,{useState} from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import AdminPage from './pages/AdminPage';
import HomeSignInPage from './pages/HomeSignInPage'
import DoctorPage from './pages/DoctorPage'
import GuardianPage from './pages/GuardianPage'
import Topbar from './components/Topbar';
import PatientPage from './pages/PatientPage'
import Footer from './components/Footer'
import HomeHighlight from './components/HomeHighlight';
import Payment from './components/Payment';
import Zoom from './components/Zoom';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"))

  return (
    <>
      <ToastContainer />
        <div id="page-container">
          <Topbar token={token} setToken={setToken}/>
          <div className="container-fluid" id="content-wrap">
          <Switch>

                <Route exact path="/">
                  <HomeSignInPage token={token} setToken={setToken}/>
                </Route>

                <Route path="/admin">
                  <AdminPage/>
                </Route>
                
                <Route path="/patient">
                  <PatientPage/>
                </Route>

                <Route path="/doctor">
                  <DoctorPage/>
                </Route>

                <Route path="/videocall">
                  <Zoom/>
                </Route>

                <Route path="/payment">
                  <Payment/>
                </Route>

          </Switch>
          </div>
          {/* {
            token
            ? null
            : <HomeHighlight/>
          } */}
          <Footer/> 

      </div>   
  
    </>
        
  );
}

export default App;
