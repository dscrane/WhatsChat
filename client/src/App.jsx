import React, { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import history from './history';
import { checkAuth } from "./redux/actions";
import Home from './components/Home';
import Profile from './components/Profile';
import { ProtectedRoute } from './components/lib';


const App = props => {
  const { auth, checkAuth } = props;
  console.log(auth)
  useEffect(() => {
    checkAuth()
  }, [checkAuth, auth.isLoggedIn])

  return (
    <div className='container'>
      <Router history={history}>
        <Switch>
          <Route path='/' exact component={Home} />
          <ProtectedRoute path={`/profile/${auth._id}`} auth={auth.isLoggedIn} component={Profile} />
        </Switch>
      </Router>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { checkAuth })(App);