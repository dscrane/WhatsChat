import React, { useEffect } from 'react';
import { Redirect, Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import history from './history';
import { checkAuth } from "./redux/actions/auth";
import { Home, Profile } from './React-components/pages';
import { ProtectedRoute, Header } from './React-components/lib';


const App = props => {
  const { auth, checkAuth } = props;
  useEffect(() => {
    checkAuth()
  }, [checkAuth, auth.isLoggedIn])

  return (
    <div className='container-fluid d-flex flex-column w-100 min-vh-100 justify-content-center align-items-center'>
      <Router history={history}>
        <>
          <Header />
          <Switch>
            <Route path='/' exact>
              {auth.isLoggedIn ? <Redirect to={`/profile/${auth._id}`} /> : <Home />}
            </Route>
            <ProtectedRoute path={`/profile/${auth._id}`} auth={auth.isLoggedIn} component={Profile} />
          </Switch>
        </>
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