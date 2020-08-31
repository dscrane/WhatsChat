import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, path, ...props }) => {
  return(
    <Route
      exact
      {...props}
      render={() => {
        return props.auth ? <Component /> : <Redirect to='/' />
      }
    } />
  )
}

export default ProtectedRoute;

