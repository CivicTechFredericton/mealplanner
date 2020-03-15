import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from "../login/Login"
import Home from "../home/Home";
import Header from '../core/header/Header';
import Footer from "../core/footer/Footer"


const App = (props) => {

  return (
    <>
    
      <Header />
      <Switch>

        <Route
          path='/login'
          render={() => (
            <Login/>
          )}
        />

        <Route
          path='/'
          render={() => (
            <Home/>
          )}
        />
    

      </Switch>
      <Footer/>
      
    </>
  );
}

export default App;
