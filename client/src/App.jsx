import React, { useEffect } from 'react';
import { Redirect, Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import history from './history';
import { checkAuth } from "./redux/actions/auth";
import { Home, Profile, Chat } from './pages';
import { Sidebar } from './components/sidebar';
import ProtectedRoute from './ProtectedRoute'

const App = ({ auth, checkAuth }) => {

  useEffect(() => {
    if (!auth.token) {
      checkAuth()
    }
    console.log('[APP]: check auth')
  }, [auth.token])

  return (
    <div className='wrapper d-flex align-items-stretch'>
      <Router history={history}>
        <>
          <Sidebar />
          <Switch>
            <Route path='/' exact>
              {auth.isLoggedIn ? <Redirect to={`/profile/${auth._id}`} /> : <Home />}
            </Route>
            <ProtectedRoute path={`/profile/:id`} auth={auth.isLoggedIn} component={Profile} />
            <ProtectedRoute path='/chats/:id' auth={auth.isLoggedIn} component={Chat} />
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