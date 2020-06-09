import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutPlayer } from "../../actions/authActions";



class Dashboard extends Component {
	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutPlayer();
	};



	render() {
		const { player } = this.props.auth;
		
		
return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Dashboard (work in progress)</b>
              <p className="flow-text grey-text text-darken-1">
              </p>
            </h4>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
	logoutPlayer: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ logoutPlayer }
)(Dashboard);