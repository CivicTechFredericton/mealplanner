import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from "../home/Home";
import Login from "../login/Login";
//import Header from '../core/header/Header';
//import Footer from "../core/footer/Footer";
import Dashboard from "../dashboard/Dashboard";


const App = () => {
 
  return (
    <>
      <Switch>
      <Route
          path='/login'
          render={() => (
            <Login />
          )}
        />
        <Route
          path='/dashboard'
          render={() => (
            <Dashboard />
          )}
        />
        <Route
          path='/'
          render={() => (
            <Home />
          )}
        />
      </Switch>
      
      
    </>
  );
};

export default App;
