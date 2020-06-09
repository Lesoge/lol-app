import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentPlayer, logoutPlayer } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import MyAccount from "./components/myAccount/MyAccount";
import MyStatistics from "./components/myStatistics/MyStatistics";
import Leaderboard from "./components/leaderboard/Leaderboard";
import Forum from "./components/forum/Forum";
import Forumcreate from "./components/forum/Forumcreate";

// Check for token to keep player logged in
if (localStorage.jwtToken) {
	// Set auth token header auth
	const token = localStorage.jwtToken;
	setAuthToken(token);
	// Decode token and get player info and exp
	const decoded = jwt_decode(token);
	// Set player and isAuthenticated
	store.dispatch(setCurrentPlayer(decoded));
  
// Check for expired token
	const currentTime = Date.now() / 1000; // to get in milliseconds
	if (decoded.exp < currentTime) {
		// Logout player
		store.dispatch(logoutPlayer());
		// Redirect to login
		window.location.href = "./login";
	}
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/mystats" component={MyStatistics} />
            <Route exact path="/leaderboard" component={Leaderboard} />
            <Route exact path="/forum" component={Forum} />
            <Route exact path="/forum/create" component={Forumcreate} />
            <Switch>
              <PrivateRoute exact path="/myaccount" component={MyAccount} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;