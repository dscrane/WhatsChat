import React, { useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import history from './history';
import Home from './components/Home';
import Profile from './components/Profile';


const App = props => {

  return (
    <div className='ui grid center aligned container'>
      <Router history={history}>
        <Switch>
          <Route path='/' exact component={Home} />
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

export default connect(mapStateToProps)(App);