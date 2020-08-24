import React from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import history from './lib/history';
import { Home, Login, Signup, Profile } from './components';




export const App = () => {
  return (
    <div className='ui container'>
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={Home} />
          {/*<Route exact path='/login' component={Login} />*/}
          {/*<Route exact path='/signup' component={Signup} />*/}
          {/*<Route exact path='/profile' component={Profile} />*/}
        </Switch>
      </Router>
    </div>
  )


}