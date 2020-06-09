import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logoutPlayer } from "../../actions/authActions";
import {connect} from "react-redux";
import Button from "react-bootstrap/Button";

class Navbar extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutPlayer();
    };


  render() {
      const { player } = this.props.auth;
      const isLoggedIn = this.props.auth.isAuthenticated;


    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">


            <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center-left black-text"
            >
              lol-app
            </Link>

            <div>
                {isLoggedIn
                    ? <Button
                        style={{
                            width: "140px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                        }}
                        onClick={this.onLogoutClick}
                        className="btn btn-large btn-flat waves-effect grey right black-text"
                    >
                        Logout
                    </Button>
                    : <Link
                        to="/login"
                        style={{
                            width: "140px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px"
                        }}
                        className="btn btn-large btn-flat waves-effect grey right black-text"
                    >
                        Log In
                    </Link>
                }
            </div>


            <Link
                to="/myaccount"
                style={{
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                }}
                className="btn btn-large btn-flat waves-effect white right black-text"
            >
                My Account
            </Link>
            <Link
                to="/mystats"
                style={{
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                }}
                className="btn btn-large btn-flat waves-effect white right black-text"
            >
                My Statistics
            </Link>
            <Link
                to="/leaderboard"
                style={{
                borderRadius: "3px",
                letterSpacing: "1.5px"
                }}
                className="btn btn-large btn-flat waves-effect white right black-text"
            >
                Leaderboard
            </Link>
            <Link
                to="/forum"
                style={{
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                }}
                className="btn btn-large btn-flat waves-effect white right black-text"
              >
                Forum
            </Link>
            <Link
                to="/dashboard"
                style={{
                borderRadius: "3px",
                letterSpacing: "1.5px"
                }}
                className="btn btn-large btn-flat waves-effect white right black-text"
            >
                Dashboard
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
    logoutPlayer: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutPlayer }
)(Navbar);
