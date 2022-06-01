import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { getCurrentToken } from '../../utils/auth';

const PrivateRoute = ({ render, ...rest }) => (
  <Route {...rest} render={() => {
    const token = getCurrentToken();
    if (token) {
      return render();
    }
    return <Redirect to='/' />;
  }} />
);

PrivateRoute.propTypes = {
  render: PropTypes.func,
};

export default PrivateRoute;
