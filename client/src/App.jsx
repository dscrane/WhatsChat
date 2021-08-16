import React, { useEffect } from "react";
import { Redirect, Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import history from "./config/history";
import { checkAuth } from "./redux/actions/authActions";
import { Home, Chat } from "./pages";
import { Sidebar } from "./components/Sidebar";
import { displayChatrooms } from "./redux/actions/chatActions";
import "./styles/bootstrap.min.css";
import "./styles/root.css";

const App = ({ auth, checkAuth, displayChatrooms }) => {
  useEffect(() => {
    if (!auth.token) {
      checkAuth();

      // displayChatrooms(auth.data.favoriteRooms);
    }
  }, [auth.token, checkAuth, displayChatrooms]);

  return (
    <div className="display wrapper">
      <Router history={history}>
        <>
          <Sidebar auth={auth.isLoggedIn} />
          <Switch>
            <Route path="/" exact>
              {auth.isLoggedIn ? (
                <Redirect to={`/chats/${auth.currentChatroom}`} />
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

export default connect(mapStateToProps, {
  checkAuth,
  displayChatrooms,
})(App);
