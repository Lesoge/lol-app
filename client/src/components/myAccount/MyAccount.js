import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutPlayer } from "../../actions/authActions";
import axios from "axios";



class MyAccount extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutPlayer();
    };

    state = {
        player: [],
        isLoading: true,
        errors: null
    };

    getPlayer() {
        axios.get('http://localhost:8000/test/getplayer/' + this.props.auth.player.id)
            .then(response => {
                this.setState({
                    player: response.data.data,
                    isLoading: false
                });
            })
            .catch(error => this.setState({ error, isLoading: false}))
    }

    componentDidMount() {
        this.getPlayer();
    }


    render() {
        const { isLoading, player } = this.state;
        const { players } = this.props.auth;

        return (
            <React.Fragment>
                <h3 className={"center-align"}>My Account</h3>
                <div className= "center-align">
                    {!isLoading ? (
                        player.map(player => {
                            const { _id, elo, username, email, summonername } = player;
                            return (
                                <div key={_id}>
                                    <p> Email:  {email} </p>
                                    <p> Username:  {username} </p>
                                    <p> Elopoints:  {elo} </p>
                                    <p> Saved summonername: {summonername}</p>
                                </div>
                            );
                        })
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </React.Fragment>
        );
    }
}

MyAccount.propTypes = {
    logoutPlayer: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutPlayer }
)(MyAccount);