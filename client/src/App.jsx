import React, { useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import history from './history';
import { checkAuth, fetchUserData } from "./redux/actions";
import Home from './components/Home';
import Profile from './components/Profile';


const App = props => {
  const { user, checkAuth, fetchUserData } = props;
  useEffect(() => {
    checkAuth()
    fetchUserData()
  }, [])
  console.log(user)

  return (
    <div className='ui grid center aligned container'>
      <Router history={history}>
        <Switch>
          <Route path='/' render={() => {
            return !user.isLoggedIn ? (
              <Home />
            ) : (
              <Redirect to={`/profile/:id`} />
            )
          }} />
          <Route path='/profile/:id' exact component={Profile} />
        </Switch>
      </Router>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.userState
  }
}

export default connect(mapStateToProps, { checkAuth, fetchUserData })(App);