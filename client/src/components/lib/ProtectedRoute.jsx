import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, path, ...props }) => {
  console.log(Component)
  console.log('[PROPS]:', props)

  console.log('[PROTECTED_ROUTE]:', props.auth)
  return(
    <Route
      exact
      {...props}
      // path={path}
      render={() => {
        return props.auth ? <Component /> : <Redirect to='/' />
      }
    } />
  )
}


