import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../core/private-route/PrivateRoute';
import Login from "../login/Login";
import Dashboard from "../dashboard/Dashboard";
import PlanPage from '../planpage/PlanPage';
import Catalog from '../catalog/Catalog';
import DisplayMeal from '../displayMeal/DisplayMeal';
import ShoppingList from '../ShoppingList/ShoppingList';

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
          path='/catalogue-meals'
          render={() => (
            <Catalog />
          )}
        />
        <Route
          path='/meal/:id'
          render={() => (
            <DisplayMeal />
          )}
        />
        <PrivateRoute
          path='/meal-designer'
          render={() => (
            <PlanPage />
          )}
        />
        <PrivateRoute
          path='/mealplans/:rowId/shoppinglist'
          render={()=> (<ShoppingList />)}
        />
        <Route
          path='/'
          render={() => (
            <Dashboard />
          )}
        />
      </Switch>
      
      
    </>
  );
};

export default App;
