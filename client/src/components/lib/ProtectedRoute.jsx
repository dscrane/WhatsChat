import React from 'react';
import { Redirect } from 'react-router-dom';

export const ProtectedRoute = (props) => {
  const Component = props.component
  console.log(Component)
  console.log('[PROPS]:', props)

  console.log('[PROTECTED_ROUTE]:', props.auth)
  return(
    props.auth
          ? <Component />
          : <Redirect to='/' />

  )
}


