import React, { useEffect } from 'react';
import { Redirect, Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import history from './history';
import { checkAuth } from "./redux/actions/auth";
import { Home, Chat } from './pages';
import { Sidebar } from './components/sidebar';
import ProtectedRoute from './ProtectedRoute'
import {displayChatRooms} from "./redux/actions/chat";

const App = ({ auth, checkAuth, displayChatRooms }) => {
  const defaultChatRoom = '5f52268b6d59e14df8174254';
  useEffect(() => {
    if (!auth.token) {
      checkAuth()
      displayChatRooms()
      console.log('[APP]: check auth')
    }
  }, [auth.token, checkAuth, displayChatRooms])

  return (
    <div className='wrapper d-flex align-items-stretch'>
      <Router history={history}>
        <>
          <Sidebar />
          <Switch>
            <Route path='/' exact>
              {auth.isLoggedIn ? <Redirect to={`/chats/${defaultChatRoom}`} /> : <Home />}
            </Route>
            <ProtectedRoute path='/chats/:id' auth={auth.isLoggedIn} component={Chat} />
          </Switch>
        </>
      </Router>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps, { checkAuth, displayChatRooms })(App);