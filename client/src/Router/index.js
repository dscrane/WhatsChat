import {Redirect, Route, Router, Switch} from "react-router-dom";
import history from "../history";
import {Sidebar} from "../components/sidebar";
import {Chat, Home, Profile} from "../pages";
import ProtectedRoute from "../ProtectedRoute";
import React from "react";

export default (
  <Router history={history}>
    <>
      <Sidebar />
      <Switch>
        <Route path='/' exact>
          {auth.isLoggedIn ? <Redirect to={`/profile/${auth._id}`} /> : <Home />}
        </Route>
        <ProtectedRoute path={`/profile/${auth._id}`} auth={auth.isLoggedIn} component={Profile} />
        <Route path='/chats/:id' exact component={Chat} />
      </Switch>
    </>
  </Router>
)