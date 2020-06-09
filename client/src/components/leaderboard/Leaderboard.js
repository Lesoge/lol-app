import React, { Component } from "react";
import axios from "axios";


class Leaderboard extends Component {

    state = {
        players: [],
        isLoading: true,
        errors: null
    };

    getPlayers() {
        axios.get('http://localhost:8000/test/getplayers')
            .then(response => {
                this.setState({
                    players: response.data.data,
                    isLoading:false
                });
            })
            .catch(error => this.setState({ error, isLoading: false}))
    }

    componentDidMount() {
        this.getPlayers();
    }

    renderTableData(Array) {
        var x = 1;
        return Array.map((player, index) => {
            const { _id, elo, username } = player
            return (
                <tr key={_id}>
                    <td>{x++}.</td>
                    <td>{username}</td>
                    <td>{elo}</td>
                </tr>
            )
        })
    }





    render() {
        const { isLoading } = this.state;
        const sortArray = [].concat(this.state.players)
            .sort((a, b) => b.elo - a.elo);
        var x = 1;

        return (

            <div>
                <h3 id='title' className={"center-align"}>Leaderboard</h3>
                <table id='player' className={"center-align"} style ={{ width: "50%", margin: "auto"}}>
                    <tbody>
                        <tr>
                            <td> Placement </td>
                            <td> Username </td>
                            <td> Elopoints </td>
                        </tr>
                        {this.renderTableData(sortArray)}
                    </tbody>
                </table>
            </div>


        );
    }
}

/*
<React.Fragment>
    <h3 className={"center-align"}>Leaderboard</h3>

    <div className= "center-align" >
        <h5> Place </h5>
        {!isLoading ? (

        );
        })
        ) : (
        <p>Loading...</p>
        )}
    </div>
</React.Fragment>
*/


export default Leaderboard;