import React, { useEffect } from "react";
import { Redirect, Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import history from "./history";
import { checkAuth } from "./redux/actions/auth";
import { Home, Chat } from "./pages";
import { Sidebar } from "./components/Sidebar";
// import ProtectedRoute from './ProtectedRoute'
import { displayChatRooms } from "./redux/actions/chat";
import "./styles/bootstrap.min.css";
import "./styles/styles.css";

const App = ({ auth, checkAuth, displayChatRooms }) => {
  useEffect(() => {
    if (!auth.token) {
      checkAuth();
      displayChatRooms();
    }
  }, [auth.token, checkAuth, displayChatRooms]);

  return (
    <div className="display wrapper d-flex align-items-stretch">
      <Router history={history}>
        <>
          <Sidebar auth={auth.isLoggedIn} />
          <Switch>
            <Route path="/" exact>
              {auth.isLoggedIn ? (
                <Redirect to={`/chats/${auth.currentChatRoom}`} />
              ) : (
                <Home />
              )}
            </Route>
            <Route path="/chats">
              {auth.isLoggedIn ? <Chat /> : <Redirect to="/" />}
            </Route>
          </Switch>
        </>
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { checkAuth, displayChatRooms })(App);
