import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutPlayer} from "../../actions/authActions";

import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";


/*
Für Spieler die nicht auf dem EUW Server spielen, zum später in Website einzubauen
import Select from "react-select";
const options = [
    { value: 'br1', label: 'BR'},
    { value: 'eun1', label: 'EUN'},
    { value: 'euw1', label: 'EUW'},
    { value: 'jp1', label: 'JP'},
    { value: 'kr', label: 'KR'},
    { value: 'la1', label: 'LA1'},
    { value: 'la2', label: 'LA2'},
    { value: 'na1', label: 'NA'},
    { value: 'oc1', label: 'OC'},
    { value: 'tr1', label: 'TR'},
    { value: 'ru', label: 'RU'}
    selectedOption: null,
]
 */



class Leaderboard extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutPlayer();
    };

    state = {
        playerData: {},
        rankedstats: [],
        accountstats: [],
        isLoading: true,
        playerExists: false,
        errors: null,
    };

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    setSummonername(summonername) {
        axios.post('http://localhost:8000/test/summonername/' + this.props.auth.player.id, {summonername: summonername})
            .then(response => {
                this.setState({
                    isLoading: false
                });
            })
            .catch(error => this.setState({  error, isLoading: false}))
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setSummonername(this.state.value);
        window.location.reload();
    }

    getRankedStats() {
        axios.get('http://localhost:8000/riotapi/rankedstats/' + this.props.auth.player.id)
            .then(response => {
                this.setState({
                    rankedstats: response.data.body,
                    isLoading:false
                });
            })
            .catch(error => this.setState({ error, isLoading: false}))
    }

    getAccountStats() {
        axios.get('http://localhost:8000/riotapi/lolacc/' + this.props.auth.player.id)
            .then(response => {
                this.setState({
                    accountstats: response.data.body,
                    isLoading: false
                });
            })
            .catch(error => this.setState({error, isLoading: false}))
    }

    getPlayer() {
        axios.get('http://localhost:8000/test/getplayer/' + this.props.auth.player.id)
            .then(response => {
                this.setState({
                    playerData: response.data.data[0],
                    isLoading: false
                });
            })
            .catch(error => this.setState({error, isLoading: false}))
    }

    deleteSummonername(id) {
        axios.post('http://localhost:8000/test/deletesummonername/'+ id)
            .then(response => {
                this.setState({
                    isLoading: false
                })
            })
            .catch(error => this.setState({  error, isLoading: false}))
        window.location.reload();
    }

    componentDidMount() {
        this.getAccountStats();
        this.getRankedStats();
        this.getPlayer();
    }



    render() {
        const { isLoading, rankedstats, accountstats, playerData } = this.state;


        var loggedIn = this.props.auth.isAuthenticated;

        var playerwithoutSummoner = false;
        var rankedstatsUndefined = false;

        if(rankedstats == undefined) {
            rankedstatsUndefined = true;
        }
        else {
            rankedstatsUndefined = false;
        }
        if(playerData == undefined || playerData.summonername == undefined) {
            playerwithoutSummoner = true;
        }
        else {
            playerwithoutSummoner = false;
        }


        return (
            <div className={"center-align"}>
                {loggedIn ? (
                    <React.Fragment>
                        <h4 className={"center-align"}>My Stats</h4>
                        <div className={"center-align"}>
                            { playerwithoutSummoner ? (
                                <div className={"center-align"} style={{ width: "25%", margin: "auto"}} >
                                    <p> Enter your Summonername: </p>
                                    <form onSubmit={this.handleSubmit}>
                                        <label>
                                            <input type="text" value={this.state.value} onChange={this.handleChange} />
                                        </label>
                                        <input type="submit" value="Submit"/>
                                    </form>
                                </div>
                            ) : (
                                <div>
                                    { rankedstatsUndefined ? (
                                        <p className={"center-align"}> Too many requests or summonername does not exist </p>
                                    ) : (
                                        <div className= "center-align">
                                            {!isLoading ? (
                                                rankedstats.map(player => {
                                                    const { tier, rank, summonerName, queueType, wins, losses, leaguePoints } = player;
                                                    return (
                                                        <div key={ queueType }>
                                                            <p> Summonername: {summonerName}</p>
                                                            <p> Queue: {queueType}</p>
                                                            <p> Tier: {tier}</p>
                                                            <p> Rank: {rank}</p>
                                                            <p> LP: {leaguePoints}</p>
                                                            <p> Wins: {wins}</p>
                                                            <p> Losses: {losses}</p>
                                                            <p> Winrate: {(wins / (wins+losses)) * 100}%</p>


                                                            <hr />
                                                        </div>
                                                    );

                                                })
                                            ) : (
                                                <p>Loading...</p>
                                            )}
                                        </div>
                                    )}
                                    <Button
                                    style={{
                                        borderRadius: "3px",
                                    }}
                                    onClick={() => this.deleteSummonername(this.props.auth.player.id)}
                                    className="btn btn-large btn-flat waves-effect grey center black-text"
                                    >
                                    Change Summonername
                                    </Button>
                                </div>
                            )}
                        </div>

                    </React.Fragment>
                ) : (
                    <p className={"center-align"}> You have to to login first</p>
                )}

            </div>



        );
    }
}



Leaderboard.propTypes = {
    logoutPlayer: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutPlayer }
)(Leaderboard);