import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from "react-router-dom"
import AdminPage from './pages/AdminPage';
import HomeSignInPage from './pages/HomeSignInPage'
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

        </Switch>
      </div>
    </>
        
  );
}

export default App;
