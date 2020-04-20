import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../core/private-route/PrivateRoute'
import Home from "../home/Home";
import Login from "../login/Login";
import Dashboard from "../dashboard/Dashboard";
import PlanPage from '../planpage/PlanPage'


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
        <PrivateRoute
          path='/meal-planner'
          render={() => (
            <PlanPage />
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
